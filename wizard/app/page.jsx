'use client';
import Image from "next/image";
import { useEffect, useState } from 'react';
import Link from "next/link";

export default function Page() {
  const [archs, setArchs] = useState([{ id: 0, name: "Cargando datos...", imagen: "" }]);
  const [form, setForm] = useState({ name: '', imagen: '' });

  async function loadArchs() {
    const res = await fetch('/api/archs');
    const data = await res.json();
   
    setArchs(data.arqui);
    console.log("data:",data);
  }

  useEffect(() => {
    loadArchs();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('api/archs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', imagen: '' });
    loadArchs();
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Lista Arquitectura</h1>

      <form onSubmit={handleSubmit} className="my-4 space-x-2">
        <input
          placeholder="Arquitectura"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-1"
        />
        <input
          placeholder="Imagen"
          value={form.imagen}
          onChange={(e) => setForm({ ...form, imagen: e.target.value })}
          className="border p-1"
        />
        <button className="bg-blue-500 text-white px-3 py-1 rounded">
          Agregar
        </button>
      </form>

      <ul>
        {Array.isArray(archs) ?
        (archs.map((u) => (
          <li className="flex flex-col text-center font-bold text-3xl items-center"  key={u.id}>
          {u.id}
          <Link href={`/micro/${u.id}`} className="text-blue-600 font-bold text-xl">
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
        
    </main>
  );
}
