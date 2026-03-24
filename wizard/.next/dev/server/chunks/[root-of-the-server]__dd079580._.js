module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/sqlite3 [external] (sqlite3, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("sqlite3", () => require("sqlite3"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/lib/db.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/db.js
__turbopack_context__.s([
    "openDB",
    ()=>openDB,
    "readDB",
    ()=>readDB
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$sqlite3__$5b$external$5d$__$28$sqlite3$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/sqlite3 [external] (sqlite3, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sqlite$2f$build$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/sqlite/build/index.mjs [app-route] (ecmascript) <locals>");
;
;
;
// Habilitar verbose para debug
__TURBOPACK__imported__module__$5b$externals$5d2f$sqlite3__$5b$external$5d$__$28$sqlite3$2c$__cjs$29$__["default"].verbose();
async function openDB() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sqlite$2f$build$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["open"])({
        filename: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data.db'),
        driver: __TURBOPACK__imported__module__$5b$externals$5d2f$sqlite3__$5b$external$5d$__$28$sqlite3$2c$__cjs$29$__["default"].Database
    });
    // Crear tabla si no existe
    await db.exec(`
    CREATE TABLE IF NOT EXISTS arquitectura (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      imagen TEXT UNIQUE
    );
   CREATE TABLE IF NOT EXISTS micro (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      imagen TEXT UNIQUE,
      arch_id INTEGER,
      FOREIGN KEY (arch_id) REFERENCES arquitectura(id)
    );

    CREATE TABLE IF NOT EXISTS placa (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      imagen TEXT UNIQUE,
      micro_id INTEGER,
      FOREIGN KEY (micro_id) REFERENCES micro(id)
    );

CREATE TABLE IF NOT EXISTS lenguaje (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      imagen TEXT UNIQUE,
      placa_id INTEGER,
      FOREIGN KEY (placa_id) REFERENCES placa(id)
    );

    create table if not exists categoria (
      id integer primary key autoincrement,
      name text UNIQUE,
      descripcion text
    );
     CREATE TABLE IF NOT EXISTS ejemplo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      imagen TEXT UNIQUE,
      ce_config TEXT,
      leyenda TEXT,
      lenguaje_id INTEGER,
      categoria_id INTEGER,
      FOREIGN KEY (categoria_id) REFERENCES categoria(id),
      FOREIGN KEY (lenguaje_id) REFERENCES lenguaje(id)
    );
    Insert into categoria (name, descripcion) values 
    ('TODOS', 'lista de todos los ejemplos'),
    ('Caracteristicas', 'Ejemplos que muestran las características de cada arquitectura'),
    ('rendimiento', 'Ejemplos que muestran el rendimiento de cada arquitectura'),
    ('funciones especificas', 'Ejemplos que muestran funciones específicas de cada arquitectura')
    ON CONFLICT(name) DO NOTHING;
    `);
    return db;
}
async function readDB() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sqlite$2f$build$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["open"])({
        filename: './data.db',
        driver: __TURBOPACK__imported__module__$5b$externals$5d2f$sqlite3__$5b$external$5d$__$28$sqlite3$2c$__cjs$29$__["default"].Database
    });
}
}),
"[project]/app/api/placa/[id]/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.js [app-route] (ecmascript)");
;
async function GET(request, { params }) {
    const { id } = await params;
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["openDB"])();
    const placas = await db.all('SELECT * FROM placa WHERE micro_id =?', id);
    return Response.json({
        placas
    });
}
async function POST(request) {
    const { name, imagen, eId } = await request.json();
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["openDB"])();
    console.log("name,imagen,arch_id", name, imagen, eId);
    await db.run('INSERT INTO placa (name,imagen,micro_id) VALUES (?,?,?)', [
        name,
        imagen,
        eId
    ]);
    return Response.json({
        message: 'placa agregada'
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__dd079580._.js.map