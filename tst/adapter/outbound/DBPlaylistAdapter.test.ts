
import {Database} from 'sqlite';
import {vi, describe, it, expect, afterEach} from 'vitest';
import dbPlaylistAdapter from '../../../src/adapter/outbound/DBPlaylistAdapter.ts';

const realDdlPath = 'res/create-playlist-item.sql';
const memoryPath  = ':memory:';

describe ('dbPlaylistAdapter', () => {

    let db: Database;

    afterEach (async () => {await db.close ();});

    it ('opens a database and executes the DDL', async () => {
        db = await dbPlaylistAdapter (memoryPath, realDdlPath);
        expect (db).toBeDefined ();
        expect (db).not.toBeNull ();
        const result = await db.get ('SELECT name FROM sqlite_master WHERE type = ? AND name = ?', ['table', 'playlist_item']);
        expect (result).toBeDefined ();
        expect (result.name).toBe ('playlist_item');
    });

});
