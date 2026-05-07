
import sqlite3 from 'sqlite3';
import {open, Database} from 'sqlite';
import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import {PlaylistItem} from '../src/domain/PlaylistItem.js';

const __dirname: string = path.dirname (fileURLToPath (import.meta.url));
const DB_PATH: string = path.join (__dirname, '../var/ytdj.db');
const SQL_PATH: string = path.join (__dirname, '../src/sql/insert-playlist-item.sql');
const JSON_PATH: string = path.join (__dirname, 'playlist-item.json');  // untested change

async function playlistItem (): Promise <PlaylistItem> {
    const json: string = await fs.readFile (JSON_PATH, 'utf8');
    const item: PlaylistItem = JSON.parse (json);
    return item;
}

async function run (): Promise <void> {
    try {
        const item: PlaylistItem = await playlistItem ();
        const sql: string = await fs.readFile (SQL_PATH, 'utf8');
        const db: Database <sqlite3.Database, sqlite3.Statement> = await open ({
            filename: DB_PATH,
            driver: sqlite3.Database
        });
        console.log (`Attempting to insert: ${item.title}`);
        await db.run (sql, {
            ':id': item.id,
            ':videoId': item.videoId,
            ':title': item.title,
            ':artist': item.artist,
            ':publishedAt': item.publishedAt
    });
        console.log ('Insert successful.');
        await db.close ();
    }
    catch (err: unknown) {
        if (err instanceof Error) console.error ('Insertion failed:', err.message);
        process.exit (1);
    }
}

run ();
