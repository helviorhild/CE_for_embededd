import { openDB } from '@/lib/db';

export async function GET(request,{params}) {
  const {id}=await params;
  const db = await openDB();
  const placas= await db.all('SELECT * FROM placa WHERE micro_id =?',id);
  return Response.json({ placas});
}

export async function POST(request) {
  const { name,imagen,eId } = await request.json();
  const db = await openDB();
  console.log("name,imagen,arch_id",name,imagen,eId);
  await db.run('INSERT INTO placa (name,imagen,micro_id) VALUES (?,?,?)', [name,imagen,eId]);
  return Response.json({ message: 'placa agregada' });
}
