import { openDB } from '@/lib/db';

export async function GET() {
  const db = await openDB();
  //await db.exec('CREATE TABLE IF NOT EXISTS arquitectura(id INTEGER PRIMARY KEY, name TEXT,imagen TEXT)');
  
  const placas= await db.all('SELECT * FROM placa');
  
  return Response.json({ placas});
}

export async function POST(request) {
  const { name,imagen,eId } = await request.json();
  const db = await openDB();
  console.log("name,imagen,arch_id",name,imagen,eId);
  await db.run('INSERT INTO placa (name,imagen,micro_id) VALUES (?,?,?)', [name,imagen,eId]);
  return Response.json({ message: 'placa agregada' });
}
