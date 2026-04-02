'use client'
import Link from "next/link";
import Image from "next/image";
import FormIngreso from "../../../components/FormIngreso";
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
export default function ArchPage() {  
  const { id } =useParams();
const [ejemplo, setEjemplo] = useState([{ id: 0, name: "Cargando datos...", imagen: "" }]);
const [selectedId, setSelectedId] = useState(1);
var selected_cat= 1;
const [categorias, setCategorias] = useState([]);
 async function loadEjemplo() {
   console.log("Selected value:",id, selected_cat);
    const res = await fetch(`/api/ejemplo/${id}/${selected_cat}`);
    const data = await res.json();
    setEjemplo(data.ejemplo);
    console.log("data:",data);
  }
    const loadCategorias = async () => {
   const res2 = await fetch(`/api/ejemplo/categoria`);
    const data2 = await res2.json();
    setCategorias(data2.categorias);
    console.log("data:",data2);
  }


    useEffect(() => {
      loadCategorias();
      loadEjemplo();     

    }, []);
  

  if (!ejemplo) {
    return (
      <div className="text-center text-red-500">       
      <FormIngreso eId={id} route="ejemplo" titulo="ejemplo" categoria="1" onSuccess={loadEjemplo}/>
        <p>No se encontró ejemplo prototipo para esta arquitectura</p>
        <Link href="/archs" className="text-blue-600 underline">
          ← Volver a la lista
        </Link>
      </div>
    );
  }
  const handleChange = (e) => {
  const value = e.target.value;
  selected_cat=value;      
 setSelectedId(value);
  loadEjemplo();      
};

  return (
    <div className="p-8 text-center">        
      <FormIngreso eId={id} route="ejemplo" titulo="ejemplo" categoria="1"  onSuccess={loadEjemplo}/>
      <label htmlFor="categoria-select">Tipo ejemplo:  </label>
    <select className="text-2xl font-bold mb-4 text-blue-600"
      id="categoria-select"
      value={selectedId} 
      onChange={handleChange}
    >
     {categorias.map((cat) => (
        <option  key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
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
