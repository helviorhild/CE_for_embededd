"use client";
import { useState ,useEffect} from "react";

export default function FormIngreso({ eId,route,titulo,categoria,onSuccess }) {
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({
  name: "",
  imagen: "",
  ...(eId !== undefined && { eId }),
  ...(categoria !== undefined && { categoria_id: categoria })
});
const [categorias, setCategorias] = useState([]);
 // const [form, setForm] = useState({ name: "", imagen: "" ,eId:eId,( categoria!== undefined && { categoria_id: categoria })});
async function loadCategoria() {
    const res = await fetch(`/api/ejemplo/`);
    const data = await res.json();
    setCategorias(data.categorias);
    console.log("data:",data);
  }

    useEffect(() => {
      loadCategoria();
    }, []);

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
    <div className="p-6 m-4 border border-gray-200 rounded-lg shadow-sm bg-white max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Agregar {titulo}</h1>
      <p className="text-left text-gray-500 mb-4  -rotate-45 text-3xl  whitespace-pre">            MODO Desarrollador</p>
      <form onSubmit={handleSubmit} className="my-4 space-x-2 text-center">
       {categoria !== undefined && (
      <div className="form-group text-center text-amber-800">
    <label htmlFor="categoria-select">Tipo ejemplo:  </label>
    <select className="text-2xl font-bold mb-4 text-blue-600"
      id="categoria-select"
      value={selectedId} 
      onChange={(e) => setSelectedId(e.target.value)}
    >
     {categorias.map((cat) => (
        <option  key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
    
    {selectedId && <p> {categorias[selectedId-1]?.descripcion}</p>}
  </div>) }
     
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
