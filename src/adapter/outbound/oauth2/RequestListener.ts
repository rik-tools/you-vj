
import http from 'http';
import fs from 'fs/promises';
import OAuth2Client from '../../../port/outbound/OAuth2Client.ts';

export default function requestListener (client: OAuth2Client, server: http.Server, resolve: (v: OAuth2Client) => void, reject: (e: any) => void, tokenPath: string): http.RequestListener {
    return async (request: http.IncomingMessage, response: http.ServerResponse): Promise <void> => {
        try {
            if (request.url?.includes ('/oauth2callback')) {
                const code: string | null = exchangedCode (request, response);
                //setTimeout (() => {server.closeAllConnections (); server.close ();}, 5000);
                if (code) await resolveClient (server, client, resolve, tokenPath, code);
                else rejectNoCode (server, reject);
            }
            else rejectUnrecognised (server, reject);
        }
        catch (error: unknown) {rejectError (server, reject, error);}
    };
}

function exchangedCode (request: http.IncomingMessage, response: http.ServerResponse): string | null {
    const host: string = request.headers.host?? 'localhost:3000';
    const fullUrl: URL = new URL (request.url!, `http://${host}`);
    const it: string | null = fullUrl.searchParams.get ('code');
    response.writeHead (200, {'Content-Type': 'text/plain', 'Connection': 'close'});
    response.end ('Authentication successful! You can close this tab.');
    return it;
}

async function resolveClient (server: http.Server, client: OAuth2Client, resolve: (v: OAuth2Client) => void, tokenPath: string, code: string): Promise <void> {
    //setTimeout (() => {closeServer (server);}, 5000);
    const {tokens} = await client.getToken (code);
    await fs.writeFile (tokenPath, JSON.stringify (tokens));
    client.setCredentials (tokens);
    resolve (client);
}

async function rejectNoCode (server: http.Server, reject: (e: any) => void): Promise <void> {
    closeServer (server);
    reject (new Error ('No code received in callback.'));
}

async function rejectUnrecognised (server: http.Server, reject: (e: any) => void): Promise <void> {
    closeServer (server);
    reject (new Error ('Unrecognised request path.'));
}

async function rejectError (server: http.Server, reject: (e: any) => void, error: unknown): Promise <void> {
    closeServer (server);
    reject (error);
}

function closeServer (server: http.Server): void {
    server.closeAllConnections ();
    server.close ();
}
