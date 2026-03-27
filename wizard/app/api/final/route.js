import { readDB } from '@/lib/db';

export async function GET(request,{params}) {
  const db = await readDB();
  //await db.exec('CREATE TABLE IF NOT EXISTS arquitectura(id INTEGER PRIMARY KEY, name TEXT,imagen TEXT)');
  
  const ejemplo= await db.all('SELECT * FROM ejemplo ');
  
  return Response.json({ ejemplo});
}

export async function PATCH(request) {
  const { ce_config,leyenda,eId } = await request.json();
  const db = await readDB();
  console.log("name,imagen,arch_id",ce_config,leyenda,eId);
    if (ce_config === "") {
   await db.run('UPDATE ejemplo  SET leyenda=? WHERE id=?', [leyenda,eId]);
} else  if (leyenda === "") { 
   await db.run('UPDATE ejemplo  SET ce_config=? WHERE id=?', [ce_config,eId]);
}
else {
  await db.run('UPDATE ejemplo  SET ce_config=?,leyenda=? WHERE id=?', [ce_config,leyenda,eId]);
}
  return Response.json({ message: 'datos cambiados' });
}
