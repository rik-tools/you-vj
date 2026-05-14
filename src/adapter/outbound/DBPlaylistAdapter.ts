
import path             from "path";
import fs               from "fs/promises";
import {open, Database} from 'sqlite';
import sqlite3          from 'sqlite3';

export default async function dbPlaylistAdapter (dbPath: string, ddlPath: string): Promise <Database> {
    try {
        const sql: string = await fs.readFile (ddlPath, 'utf8');
        await fs.mkdir (path.dirname (dbPath), {recursive: true});
        const db: Database <sqlite3.Database, sqlite3.Statement> = await open ({
            filename: dbPath,
            driver: sqlite3.Database
        });
        await db.exec (sql);
        return db;
    }
    catch (error: any) {
        if (error instanceof Error) {
            console.error ('[7] Initialisation failed:\n' + error.message);
            process.exit (7);
        }
        else {
            console.error ('[8] An unknown error occurred.');
            process.exit (8);
        }
    }
}
