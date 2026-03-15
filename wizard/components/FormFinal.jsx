"use client";
import { useState } from "react";

export default function FormFinal({ eId,onSuccess }) {
  const [form, setForm] = useState({ce_config:"",leyenda:"",eId:eId});

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    console.log("form:",form);
    // Enviar los datos a la API
    const res = await fetch('/api/final', {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ ce_config:"",leyenda:"",eId:eId});
      if (onSuccess) onSuccess(); // si querés refrescar la lista
    } else {
      console.error("Error al insertar en la base de datos");
    }
  };

  return (
    <div>
 <h1 className="text-2xl font-bold mb-4">Actualizar leyenda/confuguracion CE</h1>
    <form onSubmit={handleSubmit} className="my-4 space-x-2 text-center">
        <input
        placeholder="url copiada"
        value={form.ce_config}
        onChange={(e) => setForm({ ...form, ce_config: e.target.value })}
        className="border p-1"
        />
         <input
        placeholder="Texto Descriptivo"
        value={form.leyenda}
        onChange={(e) => setForm({ ...form, leyenda: e.target.value })}
        className="border p-1"
        />
      <button className="bg-blue-500 text-white px-3 py-1 rounded">
        Modificar/Agregar
      </button>
    </form>
        </div>
  );
}
