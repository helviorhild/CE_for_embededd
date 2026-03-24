import { openDB } from '@/lib/db';

export async function GET() {
  const db = await openDB(); 
  const categorias= await db.all('SELECT * FROM categoria');  
  return Response.json({ categorias});
}

export async function POST(request) {
  const { name,descripcion } = await request.json();
  const db = await openDB();
  console.log("name,descripcion",name,descripcion);
  await db.run('INSERT INTO categoria (name,descripcion)VALUES (?,?,?)', [name,descripcion]);
  return Response.json({ message: 'categoria agregada' });
}
