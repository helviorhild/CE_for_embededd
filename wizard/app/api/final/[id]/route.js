import { readDB } from '@/lib/db';

export async function GET(request,{params}) {
  const {id}=await params;
  const db = await readDB();
  //await db.exec('CREATE TABLE IF NOT EXISTS arquitectura(id INTEGER PRIMARY KEY, name TEXT,imagen TEXT)');
  
  const ejemplo= await db.all('SELECT * FROM ejemplo WHERE id=?',id);
  
  return Response.json({ ejemplo});
}

export async function PATCH(request) {
  const { ce_config,leyenda,eId } = await request.json();
  const db = await readDB();
  console.log("ce_config,leyenda,eId",ce_config,leyenda,eId);
  if (ce_config === undefined) {
  console.log("El campo no existe");
}
  //await db.run('UPDATE ejemplo  SET ce_config=?,leyenda=? WHERE id=?', [ce_config,leyenda,eId]);
  return Response.json({ message: 'datos cambiados' });
}
