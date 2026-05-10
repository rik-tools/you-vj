
import path                   from "path";
import fs                     from "fs/promises";
import {open, Database}       from 'sqlite';
import sqlite3                from 'sqlite3';
import Paths                  from '../../type/config/Paths.ts';
import OAuth2Client           from '../../type/config/OAuth2Client.ts';
import PlaylistItem           from "../../type/domain/PlaylistItem.ts";
import PlaylistItemGateway    from '../../port/outbound/PlaylistItemGateway.ts';
import PlaylistItemRepository from '../../port/outbound/PlaylistItemRepository.ts';
import oauth2Client           from "../../adapter/outbound/oauth2/Client.ts";
import ytPlaylistItemAdapter  from "../../adapter/outbound/YTPlaylistItemAdapter.ts";
import dbPlaylistItemAdapter  from "../../adapter/outbound/DBPlaylistItemAdapter.ts";
import persistPlaylistItems   from "../service/IngestingService.ts";

export default async function controlIngesting (playlistName: string, paths: Paths): Promise <void> {
    const db: Database = await database (paths.dbPath, paths.ddlPath);
    const client: OAuth2Client = await oauth2Client (paths.credsPath, paths.tokenPath);
    const gateway: PlaylistItemGateway = await ytPlaylistItemAdapter (client, playlistName);
    const repository: PlaylistItemRepository = await dbPlaylistItemAdapter (db, paths.dmlPath);
    await persistPlaylistItems (gateway, repository);
    await db.close ();
}

async function database (dbPath: string, ddlPath: string): Promise <Database> {
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
    catch (err: unknown) {
        if (err instanceof Error) console.error ('Initialization failed:', err.message);
        else console.error ('An unknown error occurred during initialization.');
        process.exit (1);
    }
}
