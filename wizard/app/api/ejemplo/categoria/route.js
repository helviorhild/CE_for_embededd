import { readDB} from '@/lib/db';
//import { readDB } from '../../../lib/db';

export async function GET() {
  const db = await readDB(); 
  const categorias= await db.all('SELECT * FROM categoria');  
  return Response.json({ categorias});
}

export async function POST(request) {
  const {name,imagen,eId,categoria_id} = await request.json();
  const db = await readDB();
  console.log("name,imagen,eId,categoria_id",name,imagen,eId,categoria_id);
  await db.run('INSERT INTO ejemplo (name,imagen,lenguaje_id,categoria_id)VALUES (?,?,?,?)', [name,imagen,eId,categoria_id]);
  return Response.json({ message: 'ejemplo agregado' });
}
