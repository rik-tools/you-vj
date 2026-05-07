import sqlite3 from 'sqlite3';
import {open, Database} from 'sqlite';
import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

// 1. Set up the paths, relative to this script
const __dirname: string = path.dirname (fileURLToPath (import.meta.url));
const DB_PATH: string = path.join (__dirname, '../var/ytdj.db');
const SQL_PATH: string = path.join (__dirname, '../src/sql/create-playlist-item.sql');

async function run (): Promise <void> {
    try {
        // 2. Read the SQL command from the source file
        console.log (`Reading schema from: ${path.basename (SQL_PATH)}`);
        const schemaSql: string = await fs.readFile (SQL_PATH, 'utf8');
        // 3. Ensure the 'var' directory exists
        const varDir: string = path.dirname (DB_PATH);
        await fs.mkdir (varDir, {recursive: true});
        // 4. Open (and potentially create) the database
        const db: Database <sqlite3.Database, sqlite3.Statement> = await open ({
            filename: DB_PATH,
            driver: sqlite3.Database
        });
        console.log ('Connection established to SQLite.');
        // 5. Execute the creation logic
        await db.exec (schemaSql);
        console.log ('Table "playlist_item" is verified/created.');
        // 6. Graceful Exit
        await db.close ();
        console.log ('Database connection closed safely.');
    }
    catch (err: unknown) {
        if (err instanceof Error) console.error ('Initialization failed:', err.message);
        else console.error ('An unknown error occurred during initialization.');
        process.exit (1);
    }
}

run ();
