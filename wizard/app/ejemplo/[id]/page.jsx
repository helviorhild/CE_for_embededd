'use client'
import Link from "next/link";
import Image from "next/image";
import FormIngreso from "../../../components/FormIngreso";
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
export default function ArchPage() {  
  const { id } =useParams();
const [ejemplo, setEjemplo] = useState([{ id: 0, name: "Cargando datos...", imagen: "" }]);
 async function loadEjemplo() {
    const res = await fetch(`/api/ejemplo/${id}`);
    const data = await res.json();
    setEjemplo(data.ejemplo);
    console.log("data:",data);
  }

    useEffect(() => {
      loadEjemplo();
    }, []);
  

  if (!ejemplo) {
    return (
      <div className="text-center text-red-500">       
      <FormIngreso eId={id} route="ejemplo" titulo="ejemplo" categoria="nueva" onSuccess={loadEjemplo}/>
        <p>No se encontró ejemplo prototipo para esta arquitectura</p>
        <Link href="/archs" className="text-blue-600 underline">
          ← Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 text-center">        
      <FormIngreso eId={id} route="ejemplo" titulo="ejemplo" categoria="nueva"  onSuccess={loadEjemplo}/>
      <ul>
        {Array.isArray(ejemplo) ?
        (ejemplo.map((u) => (
          <li className="flex flex-col text-center font-bold text-3xl items-center"  key={u.id}>
          {u.id}
          <Link href={`/final/${u.id}`} className="text-blue-600 font-bold text-xl">
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
        
      <h1 className="text-3xl font-bold mb-4">{ejemplo.name}</h1>
      <p className="text-lg">{ejemplo.imagen}</p>
      <Link href="/lenguaje" className="text-blue-600 underline mt-4 block">
        ← Volver
      </Link>
    </div>
  );
}
