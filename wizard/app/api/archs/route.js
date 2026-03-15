import { openDB } from '@/lib/db';

export async function GET() {
  const db = await openDB();
  //await db.exec('CREATE TABLE IF NOT EXISTS arquitectura(id INTEGER PRIMARY KEY, name TEXT,imagen TEXT)');
  
  const arqui= await db.all('SELECT * FROM arquitectura');
  
  return Response.json({ arqui });
}

export async function POST(request) {
  const { name,imagen } = await request.json();
  const db = await openDB();
  //console.log("name,imagen",name,imagen);
  await db.run('INSERT INTO arquitectura (name,imagen) VALUES (?,?)', [name,imagen]);
  return Response.json({ message: 'arquitectura agregada' });
}
