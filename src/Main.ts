/**
 * $ yvj show-playlists
 * $ yvj ingest <playlist-id>
 * $ yvj egest <playlist-name> [<video-id-0> ...]
 */

import path from "path";
import {fileURLToPath}  from "url";
import Paths            from './type/config/Paths.ts';
import controlShowing   from './app/controller/ShowingController.ts';
import controlIngesting from './app/controller/IngestingController.ts';
import controlEgesting  from './app/controller/EgestingController.ts';
import {exit}           from './util/Exit.ts';

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

async function main (): Promise <void> {
    const [command, ... args] = process.argv.splice (2);
    switch (command) {
        case undefined       : exit (1, process.argv [1], `missing command`);
        case 'show-playlists': controlShowing (paths); break;
        case 'ingest'        : args.length > 0? await controlIngesting (paths, args [0]): exit (3, process.argv [1], `missing playlist-id`); break;
        case 'egest'         : args.length > 0? await controlEgesting  (paths, args [0], args.slice (1)): exit (4, process.argv [1], `missing playlist-name`); break;
        default              : exit (2, process.argv [1], `unknown command: ${command}`);
    }
}

main ();
