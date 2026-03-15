import { openDB } from '@/lib/db';

export async function GET(request,{params}) {
  const {id}=await params;
  const db = await openDB();
  //await db.exec('CREATE TABLE IF NOT EXISTS arquitectura(id INTEGER PRIMARY KEY, name TEXT,imagen TEXT)');
  
  const lenguajes= await db.all('SELECT * FROM lenguaje WHERE placa_id=?',id);
  
  return Response.json({ lenguajes});
}

export async function POST(request) {
  const { name,imagen,placa_id } = await request.json();
  const db = await openDB();
  console.log("name,imagen,arch_id",name,imagen,placa_id);
  await db.run('INSERT INTO lenguaje (name,imagen,placa_id) VALUES (?,?,?)', [name,imagen,placa_id]);
  return Response.json({ message: 'lenguaje agregado' });
}
