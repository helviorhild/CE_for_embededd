// lib/db.js
import sqlite3 from 'sqlite3';
import path from 'path';
import { open } from 'sqlite';

// Habilitar verbose para debug
sqlite3.verbose();

// Abrir conexión a una base de datos local (en /project/data.db)
export async function openDB() {
  const db = await open({
    filename: path.join(process.cwd(), '/files/data.db'),
    driver: sqlite3.Database,
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
export async function readDB() {
  return open({
    filename: '/files/data.db', // ruta a tu base
    driver: sqlite3.Database,
  });
}
