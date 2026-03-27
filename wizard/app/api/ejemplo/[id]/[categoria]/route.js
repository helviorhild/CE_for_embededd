import { readDB } from '@/lib/db';

export async function GET(request,{params}) {
  const {id,categoria}=await params;
  const db = await readDB();
  var ejemplo=[];
  if(categoria==='1'){
       ejemplo= await db.all('SELECT * FROM ejemplo');
  }else{

     ejemplo= await db.all('SELECT * FROM ejemplo WHERE lenguaje_id=? AND categoria_id=?',id,categoria);
  }
 
  
  return Response.json({ ejemplo});
}

export async function POST(request) {
  const { name,imagen,eId,cId } = await request.json();
  const db = await readDB();
  console.log("name,imagen,lenguaje_id(eId)",name,imagen,eId);
  await db.run('INSERT INTO ejemplo (name,imagen,lenguaje_id,categoria_id) VALUES (?,?,?,?)', [name,imagen,eId,cId]);
  return Response.json({ message: 'ejemplo agregado' });
}
