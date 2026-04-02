import { readDB } from '@/lib/db';

export async function GET(request,{params}) {
  const {id}=await params;
  const db = await readDB();
  //await db.exec('CREATE TABLE IF NOT EXISTS arquitectura(id INTEGER PRIMARY KEY, name TEXT,imagen TEXT)');
  
  const lenguajes= await db.prepare('SELECT * FROM lenguaje WHERE placa_id=?').all(id);
  
  return Response.json({ lenguajes});
}

export async function POST(request) {
  const { name,imagen,placa_id } = await request.json();
  const db = await readDB();
  console.log("name,imagen,arch_id",name,imagen,placa_id);
  await db.prepare('INSERT INTO lenguaje (name,imagen,placa_id) VALUES (?,?,?)').run([name,imagen,placa_id]);
  return Response.json({ message: 'lenguaje agregado' });
}
