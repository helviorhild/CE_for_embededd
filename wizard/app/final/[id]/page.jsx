'use client'
import Link from "next/link";
import Image from "next/image";
import FormFinal from "../../../components/FormFinal";
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
export default function FinalPage() {
  const { id } = useParams();
  const [ejemplo, setEjemplo] = useState([{ id: 0, name: "Cargando datos...", imagen: "",ce_config:"",leyenda:"", ejemplo_id: 0 }]);
  async function loadEjemplo() {
    const res = await fetch(`/api/final/${id}`);
    const data = await res.json();
    setEjemplo(data.ejemplo);
  }

  useEffect(() => {
    loadEjemplo();
  }, []);


  if (!ejemplo) {
    return (
      <div className="text-center text-red-500">
        <FormFinal eId={id} route="final" titulo="ejemplo" onSuccess={loadEjemplo} />
        <p>No se encontró ejemplo prototipo para esta arquitectura</p>
        <Link href="/placa" className="text-blue-600 underline">
          ← Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 text-center">
      <FormFinal eId={id} route="final" titulo="ejemplo" onSuccess={loadEjemplo} />
      <ul>
        {Array.isArray(ejemplo) ?
          (ejemplo.map((u) => (
            <li className="flex flex-col text-center font-bold text-3xl items-center" key={u.id}>
              {u.id}
              <Link href={`${u.ce_config}`} className="text-blue-600 font-bold text-xl">
                {u.name}
              </Link>
              <Image
                className="dark:invert"
                src={`/${u.imagen}`}
                alt={u.name}
                width={500}
                height={100}
                priority
              />
                <div className="text-black-500 text-xl font-normal">
                  <p dangerouslySetInnerHTML={{ __html: u.leyenda }} />                  
                </div>


            </li>
          ))) : (<p className="text-gray-500">No se encontró información</p>)}
      </ul>

      <h1 className="text-3xl font-bold mb-4">{ejemplo.name}</h1>
      <p className="text-lg">{ejemplo.imagen}</p>
      <Link href="/ejemplo" className="text-blue-600 underline mt-4 block">
        ← Volver
      </Link>
    </div>
  );
}
