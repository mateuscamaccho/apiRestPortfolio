import { sql } from './database/postgres';

async function setup(){
   await sql`CREATE TABLE IF NOT EXISTS acessos (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        code VARCHAR(100)
    )`

    await sql.end();

    console.log("Setup executado com sucesso!")
}

setup();