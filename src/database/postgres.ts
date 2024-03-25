import postgres from 'postgres'; 
import dotenv from "dotenv";
dotenv.config()

export const sql = postgres(process.env.CONNECTION_STRING as string);