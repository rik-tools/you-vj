
import {describe, it, expect, beforeEach, afterEach} from 'vitest';
import path from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs/promises';
import sqlite3 from 'sqlite3';
import {open, Database} from 'sqlite';
import dbPlaylistItemAdapter from '../../../src/adapter/outbound/DBPlaylistItemAdapter.ts';
import PlaylistItemRepository from '../../../src/port/outbound/PlaylistItemRepository.ts';
import PlaylistItem from '../../../src/type/domain/PlaylistItem.ts';

const __dirname: string = path.dirname (fileURLToPath (import.meta.url));
const DDL_PATH: string = path.join (__dirname, '../../../res/create-playlist-item.sql');
const DML_PATH: string = path.join (__dirname, '../../../res/insert-playlist-item.sql');

let db: Database;

async function openDatabase (): Promise <Database> {
    const sql: string = await fs.readFile (DDL_PATH, 'utf8');
    const database: Database = await open ({filename: ':memory:', driver: sqlite3.Database});
    await database.exec (sql);
    return database;
}

async function readBack (): Promise <PlaylistItem []> {
    return db.all <PlaylistItem []> ('SELECT id, video_id AS videoId, title, artist, published_at AS publishedAt FROM playlist_item');
}

beforeEach (async () => {db = await openDatabase ();});
afterEach  (async () => {await db.close ();});

describe ('DBPlaylistItemAdapter', () => {

    it ('upserts a single item and reads it back correctly', async () => {
        const repo: PlaylistItemRepository = await dbPlaylistItemAdapter (db, DML_PATH);
        const item: PlaylistItem = {id: 'id-1', videoId: 'vid-1', title: 'Title One', artist: 'Artist One', publishedAt: '2024-01-01'};
        await repo.upsertPlaylistItems ([item]);
        const rows: PlaylistItem [] = await readBack ();
        expect (rows).toHaveLength (1);
        expect (rows [0]).toEqual (item);
    });

    it ('upserts multiple items and all persist correctly', async () => {
        const repo: PlaylistItemRepository = await dbPlaylistItemAdapter (db, DML_PATH);
        const items: PlaylistItem [] = [
            {id: 'id-1', videoId: 'vid-1', title: 'Title One', artist: 'Artist One', publishedAt: '2024-01-01'},
            {id: 'id-2', videoId: 'vid-2', title: 'Title Two', artist: 'Artist Two', publishedAt: '2024-01-02'}
        ];
        await repo.upsertPlaylistItems (items);
        const rows: PlaylistItem [] = await readBack ();
        expect (rows).toHaveLength (2);
        expect (rows).toEqual (items);
    });

    it ('replaces an existing row on duplicate id', async () => {
        const repo: PlaylistItemRepository = await dbPlaylistItemAdapter (db, DML_PATH);
        const original: PlaylistItem    = {id: 'id-1', videoId: 'vid-1', title: 'Title One',    artist: 'Artist One',    publishedAt: '2024-01-01'};
        const replacement: PlaylistItem = {id: 'id-1', videoId: 'vid-1', title: 'Replaced Title', artist: 'Replaced Artist', publishedAt: '2024-01-02'};
        await repo.upsertPlaylistItems ([original]);
        await repo.upsertPlaylistItems ([replacement]);
        const rows: PlaylistItem [] = await readBack ();
        expect (rows).toHaveLength (1);
        expect (rows [0]).toEqual (replacement);
    });

});
