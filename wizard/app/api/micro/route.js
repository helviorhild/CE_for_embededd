import { openDB } from '@/lib/db';

export async function GET() {
  const db = await openDB();
  //await db.exec('CREATE TABLE IF NOT EXISTS arquitectura(id INTEGER PRIMARY KEY, name TEXT,imagen TEXT)');
  
  const micros= await db.all('SELECT * FROM micro');
  
  return Response.json({ micros});
}

export async function POST(request) {
  const { name,imagen,eId } = await request.json();
  const db = await openDB();
  console.log("name,imagen,eId",name,imagen,eId);
  await db.run('INSERT INTO micro (name,imagen,arch_id) VALUES (?,?,?)', [name,imagen,eId]);
  return Response.json({ message: 'micro agregado' });
}
