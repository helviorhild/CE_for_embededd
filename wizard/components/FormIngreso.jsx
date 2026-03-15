"use client";
import { useState } from "react";

export default function FormIngreso({ eId,route,titulo,onSuccess }) {
  const [form, setForm] = useState({ name: "", imagen: "" ,eId:eId});

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    console.log("form:",form);
    // Enviar los datos a la API
    const res = await fetch(`/api/${route}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ name: "", imagen: "" ,eId:eId});
      if (onSuccess) onSuccess(); // si querés refrescar la lista
    } else {
      console.error("Error al insertar en la base de datos");
    }
  };

  return (
    <div>
 <h1 className="text-2xl font-bold mb-4">Agregar {titulo}</h1>
    <form onSubmit={handleSubmit} className="my-4 space-x-2 text-center">
      <input
        placeholder={titulo}
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
        </div>
  );
}
