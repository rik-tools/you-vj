/**
 * $ yvj show-playlists
 * $ yvj ingest <playlist-id>
 * $ yvj egest <playlist-name> [<video-id-0> ...]
 */

import fs from 'fs/promises';
import path from "path";
import {fileURLToPath}  from "url";
import Paths            from './type/config/Paths.ts';
import controlShowing   from './app/controller/ShowingController.ts';
import controlIngesting from './app/controller/IngestingController.ts';
import controlEgesting  from './app/controller/EgestingController.ts';

const __dirname: string = path.dirname (fileURLToPath (import.meta.url));
const DB_PATH: string = path.join (__dirname, '../var/yvj.db');
const CREDS_PATH: string = path.join (__dirname, '../credentials.json');
const TOKEN_PATH: string = path.join (__dirname, '../token.json');
const DDL_PATH: string = path.join (__dirname, '../res/create-playlist-item.sql');
const DML_PATH: string = path.join (__dirname, '../res/insert-playlist-item.sql');

const paths: Paths = {
    dbPath: DB_PATH,
    credsPath: CREDS_PATH,
    tokenPath: TOKEN_PATH,
    ddlPath: DDL_PATH,
    dmlPath: DML_PATH
};

async function exit (code: number, message: string): Promise <void> {
    const how: string = (await fs.readFile (process.argv [1], 'utf8')).split ('\n').slice (0, 5).join ('\n');
    console.error (how);
    console.error (message);
    process.exit (code);
}

async function main (): Promise <void> {
    const [command, ... args] = process.argv.splice (2);
    switch (command) {
        case undefined       : exit (1, `missing command`);
        case 'show-playlists': await controlShowing (paths); break;
        case 'ingest'        : args.length > 0? await controlIngesting (args [0], paths): exit (3, `missing playlist-name`); break;
        case 'egest'         : args.length > 0? await controlEgesting  (args [0], args.slice (1), paths): exit (4, `missing playlist-name`); break;
        default              : exit (2, `unknown command: ${command}`);
    }
}

main ();
