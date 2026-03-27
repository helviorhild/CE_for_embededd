import { readDB } from '@/lib/db';

export async function GET(request,{params}) {
  const {id}=await params;
  const db = await readDB();
 
  const ejemplo= await db.all('SELECT * FROM ejemplo WHERE lenguaje_id=? ',id);
  
  return Response.json({ ejemplo});
}

export async function POST(request) {
  const { name,imagen,eId } = await request.json();
  const db = await readDB();
  console.log("name,imagen,lenguaje_id(eId)",name,imagen,eId);
  await db.run('INSERT INTO ejemplo (name,imagen,lenguaje_id) VALUES (?,?,?)', [name,imagen,eId]);
  return Response.json({ message: 'ejemplo agregado' });
}
