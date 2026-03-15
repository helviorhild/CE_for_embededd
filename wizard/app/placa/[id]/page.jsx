'use client'
import Link from "next/link";
import Image from "next/image";
import FormIngreso from "../../../components/FormIngreso";
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
export default function ArchPage() {  
  const { id } =useParams();
const [placa, setPlaca] = useState([{ id: 0, name: "Cargando datos...", imagen: "" ,micro_id:id}]);
 async function loadPlacas() {
    const res = await fetch(`/api/placa/${id}`);
    const data = await res.json();
    setPlaca(data.placas);
    console.log("data:",data);
  }

    useEffect(() => {
      loadPlacas();
    }, []);
  

  if (!placa) {
    return (
      <div className="text-center text-red-500">       
      <FormIngreso eId={id} route="placa"/>
        <p>No se encontró placa prototipo para esta arquitectura</p>
        <Link href="/micro" className="text-blue-600 underline">
          ← Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 text-center">        
      <FormIngreso eId={id} route="placa" titulo="placa"/>
      <ul>
        {Array.isArray(placa) ?
        (placa.map((u) => (
          <li className="flex flex-col text-center font-bold text-3xl items-center"  key={u.id}>
          {u.id}
          <Link href={`/lenguaje/${u.id}`} className="text-blue-600 font-bold text-xl">
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
        ))):( <p className="text-gray-500">No se encontró información</p>)}
      </ul>  
        
      <h1 className="text-3xl font-bold mb-4">{placa.name}</h1>
      <p className="text-lg">{placa.imagen}</p>
      <Link href="/micro" className="text-blue-600 underline mt-4 block">
        ← Volver
      </Link>
    </div>
  );
}
