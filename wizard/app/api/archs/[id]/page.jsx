import { readDB } from '@/lib/db';

export default async function ArchPage({ params }) {
  const db = await readDB();
  const arch = await db.get('SELECT * FROM arquitectura WHERE id = ?', [params.id]);

  if (!arch) {
    return <h1>arquitectura no encontradoa 😢</h1>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Arquitectura: {arch.name}</h1>
      <p>Imagen: {arch.imagen}</p>
      <p>ID: {arch.id}</p>
    </div>
  );
}
