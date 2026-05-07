
import {Auth, google} from 'googleapis';
import fs from 'fs/promises';
import path from 'path';
import readline from 'readline/promises';
import {stdin as input, stdout as output} from 'process';
import http from 'http';
import open from 'open';

type OAuth2Client = Auth.OAuth2Client;
type Executor = (resolve: (value: OAuth2Client) => void, reject: (reason?: any) => void) => void;

const OAuth2: typeof google.auth.OAuth2 = google.auth.OAuth2;
const CREDS_PATH: string = path.join (process.cwd (), 'credentials.json');
const TOKEN_PATH: string = path.join (process.cwd (), 'token.json');

interface Secrets {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
}

export default async function oauth2Client (): Promise <OAuth2Client> {
    try {
        const creds: Secrets = await credentials ();
        const client: OAuth2Client = new OAuth2 (creds.client_id, creds.client_secret, creds.redirect_uri);
        try {return await locallyDerivedClient (client, creds);}
        catch (error: unknown) {return await remotelyDerivedClient (client, creds);}
    }
    catch (error: any) {
        if (error.code === 'ENOENT') {
            console.error ('Error: credentials.json not found.');
            console.error ('Please download it from the Google Cloud Console (APIs & Services > Credentials).');
            process.exit (1);
        }
        throw error;
    }
}

async function credentials (): Promise <Secrets> {
    const content: string = await fs.readFile (CREDS_PATH, 'utf8');
    const json: Record <string, any> = JSON.parse (content);
    const keys: Record <string, any> = json.installed || json.web;
    return {
        client_id: keys.client_id,
        client_secret: keys.client_secret,
        redirect_uri: keys.redirect_uris [0]
    };
}

async function locallyDerivedClient (client: OAuth2Client, secrets: Secrets): Promise <OAuth2Client> {
    const token: string = await fs.readFile (TOKEN_PATH, 'utf8');
    client.setCredentials (JSON.parse (token));
    const expiry: number = client.credentials.expiry_date?? 0;
    if (Date.now () >= expiry) {
        const {tokens}: any = await client.refreshAccessToken ();
        await fs.writeFile (TOKEN_PATH, JSON.stringify (tokens));
        client.setCredentials (tokens);
    }
    return client;
}

async function remotelyDerivedClient (client: OAuth2Client, secrets: Secrets): Promise <OAuth2Client> {
    const authorisingUrl: string = client.generateAuthUrl ({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['https://www.googleapis.com/auth/youtube.force-ssl'],
    });
    return new Promise (acceptance (client, secrets, authorisingUrl));
}

function acceptance (client: OAuth2Client, secrets: Secrets, authorisingUrl: string): Executor {
    return (resolve: (v: OAuth2Client) => void, reject: (e: unknown) => void): void => {
        const server: http.Server = http.createServer ();
        const respond = running (client, server, resolve, reject);
        server.on ('request', respond);
        server.listen (3000, () => {open (authorisingUrl);});
    }
}

const running = (
    client: OAuth2Client,
    server: http.Server,
    resolve: (v: OAuth2Client) => void,
    reject: (e: any) => void
) => async (request: http.IncomingMessage, response: http.ServerResponse) => {
    try {
        if (request.url?.includes ('/oauth2callback')) {
            const host: string = request.headers.host?? 'localhost:3000';
            const fullUrl: URL = new URL (request.url, `http://${host}`);
            const code: string | null = fullUrl.searchParams.get ('code');
            response.writeHead (200, {
                'Content-Type': 'text/plain',
                'Connection': 'close'
            });
            response.end ('Authentication successful! You can close this tab.');
            // Give the browser 500ms to receive the data before killing the server
            setTimeout (() => {server.closeAllConnections (); server.close ()}, 5000);
            if (code) {
                const {tokens} = await client.getToken (code);
                await fs.writeFile (TOKEN_PATH, JSON.stringify (tokens));
                client.setCredentials (tokens);
                resolve (client);
            }
        }
    }
    catch (e) {server.closeAllConnections (); server.close (); reject (e);}
}
