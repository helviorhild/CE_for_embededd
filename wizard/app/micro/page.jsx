// app/api/users/route.js
import Link from "next/link";
import { readDB } from "@/lib/db";

export default async function MicroPage() {
  const db = await readDB();
  const micro = await db.all("SELECT id, name, imagen, arch_id FROM micro");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Lista de Micros</h1>

      <ul className="space-y-4">
        {micro.map((u) => (
          <li
            key={u.id}
            className="text-center border rounded-xl p-3 hover:bg-gray-100 transition"
          >
            {/* 🔗 Enlace con el ID dinámico */}
            <Link href={`/placa/${u.id}`} className="text-blue-600 font-bold text-xl">
              {u.name}
            </Link>
            <p className="text-gray-600">{u.imagen}</p>
            <p className="text-gray-600">arquitectura:{u.arch_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
