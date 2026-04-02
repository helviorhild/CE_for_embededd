'use client'
import Link from "next/link";
import Image from "next/image";
import FormIngreso from "../../../components/FormIngreso";
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
export default function LenguajePage() {
  const { id } = useParams();
  const [lenguaje, setLenguaje] = useState([{ id: 0, name: "Cargando datos...", imagen: "", eId: id }]);
  async function loadLenguaje() {
    const res = await fetch(`/api/lenguaje/${id}`);
    const data = await res.json();
    setLenguaje(data.lenguajes);
  }

  useEffect(() => {
    loadLenguaje();
  }, []);


  if (!lenguaje) {
    return (
      <div className="text-center text-red-500">
        <FormIngreso eId={id} route="lenguaje" titulo="Lenguaje" onSuccess={loadLenguaje} />
        <p>No se encontró lenguaje prototipo para esta arquitectura</p>
        <Link href="/placa" className="text-blue-600 underline">
          ← Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 text-center">
      <FormIngreso eId={id} route="lenguaje" titulo="Lenguaje" onSuccess={loadLenguaje} />
      <ul>
        {Array.isArray(lenguaje) ?
          (lenguaje.map((u) => (
            <li className="flex flex-col text-center font-bold text-3xl items-center" key={u.id}>
              {u.id}
              <Link href={`/ejemplo/${u.id}`} className="text-blue-600 font-bold text-xl">
                {u.name}
              </Link>
              <Image
                className="dark:invert"
                src={`/${u.imagen}`}
                alt={u.name}
                width={100}
                height={20}
                priority
              />

            </li>
          ))) : (<p className="text-gray-500">No se encontró información</p>)}
      </ul>

      <h1 className="text-3xl font-bold mb-4">{lenguaje.name}</h1>
      <p className="text-lg">{lenguaje.imagen}</p>
      <Link href="/placa" className="text-blue-600 underline mt-4 block">
        ← Volver
      </Link>
    </div>
  );
}
