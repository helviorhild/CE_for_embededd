import { readDB } from '@/lib/db';

export async function GET(request,{params}) {
  const {id}=await params;
  const db = await readDB();
  const placas= await db.prepare('SELECT * FROM placa WHERE micro_id =?').all(id);
  return Response.json({ placas});
}

export async function POST(request) {
  const { name,imagen,eId } = await request.json();
  const db = await readDB();
  console.log("name,imagen,arch_id",name,imagen,eId);
  await db.prepare('INSERT INTO placa (name,imagen,micro_id) VALUES (?,?,?)').run([name,imagen,eId]);
  return Response.json({ message: 'placa agregada' });
}
