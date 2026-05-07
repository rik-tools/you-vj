
import path from "path";
import fs from "fs/promises";
import sqlite3 from 'sqlite3';
import {open, Database} from 'sqlite';
import {fileURLToPath} from "url";
import PlaylistItemRepository from '../../port/outbound/PlaylistItemRepository.ts';
import PlaylistItem from '../../domain/PlaylistItem.ts';

const __dirname: string = path.dirname (fileURLToPath (import.meta.url));
const DB_PATH: string = path.join (__dirname, '../../../../var/yvj.db');
const SQL_PATH_0: string = path.join (__dirname, '../../../res/create-playlist-item.sql');
const SQL_PATH_1: string = path.join (__dirname, '../../../res/insert-playlist-item.sql');

async function database (): Promise <Database> {
    try {
        const sql: string = await fs.readFile (SQL_PATH_0, 'utf8');
        const varDir: string = path.dirname (DB_PATH);
        await fs.mkdir (varDir, {recursive: true});
        const db: Database <sqlite3.Database, sqlite3.Statement> = await open ({
            filename: DB_PATH,
            driver: sqlite3.Database
        });
        await db.exec (sql);
        return db;
    }
    catch (err: unknown) {
        if (err instanceof Error) console.error ('Initialization failed:', err.message);
        else console.error ('An unknown error occurred during initialization.');
        process.exit (1);
    }
}

export default async function dbPlaylistItemAdapter (): Promise <PlaylistItemRepository> {
    const db: Database = await database ();
    async function upsertPlaylistItems (playlistItems: PlaylistItem []): Promise <void> {
        const sql: string = await fs.readFile (SQL_PATH_1, 'utf8');
        for (const item of playlistItems) {
            await db.run (sql, {
                ':id': item.id,
                ':videoId': item.videoId,
                ':title': item.title,
                ':artist': item.artist,
                ':publishedAt': item.publishedAt
            });
        }
        await db.close ();
    }
    return {upsertPlaylistItems}
}
