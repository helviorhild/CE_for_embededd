import { openDB } from '@/lib/db';

export async function GET() {
  const db = await openDB();
 
  const ejemplos= await db.all('SELECT * FROM ejemplo');
  
  return Response.json({ ejemplos});
}

export async function POST(request) {
  const { name,imagen,eId } = await request.json();
  const db = await openDB();
  console.log("name,imagen,lenguaje_id",name,imagen,eId);
  await db.run('INSERT INTO ejemplo (name,imagen,lenguaje_id) VALUES (?,?,?)', [name,imagen,eId]);
  return Response.json({ message: 'ejemplo agregado' });
}
