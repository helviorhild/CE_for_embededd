// app/api/users/route.js
import Link from "next/link";
import { readDB } from "@/lib/db";

export default async function FinalPage() {

return(
  <div>Nada por aca todavía</div>
)

}







/*

PARA UTILIDAD NADA MÄS
function makeCEUrl(code, compiler = "cavrg1520", options = "-mmcu=atmega328p") {
  const state = {
    version: 4,
    content: [{
      type: "component",
      componentName: "codeEditor",
      componentState: {
        source: code,
        lang: "c"
      }
    }, {
      type: "component",
      componentName: "compiler",
      componentState: {
        compiler: compiler,
        source: 1,
        options: options,
        filters: { binary: true, execute: true }
      }
    }]
  };

  // Serializar a JSON y codificar
  const encoded = encodeURIComponent(JSON.stringify(state));

  // Devolver URL
  return `http://localhost:10240/#g:${encoded}`;
}

// Ejemplo:
const code = `
*/
/* Type your code here, UTN */
/*
int main(void) {
    int num2=0,num=2;
    for(;num2<num;++num2){
        num+=num2;
    }
    return num*num;
}
`;

console.log(makeCEUrl(code));





export default async function FinalPage() {
  const db = await readDB();
  const archs = await db.all("SELECT id, name, imagen FROM arquitectura");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Lista de arquitecturas</h1>

      <ul className="space-y-4">
        {archs.map((u) => (
          <li
            key={u.id}
            className="text-center border rounded-xl p-3 hover:bg-gray-100 transition"
          >
          
            {
          */
          /* 🔗 Enlace con el ID dinámico */
        /*
        }
            <Link href={`/archs/${u.id}`} className="text-blue-600 font-bold text-xl">
              {u.name}
            </Link>
            <p className="text-gray-600">{u.imagen}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
*/