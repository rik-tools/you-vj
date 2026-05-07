import {google} from 'googleapis';
import http from 'http';
import url from 'url';
import open from 'open';
import fs from 'fs/promises';

// 1. Load your credentials
const TOKEN_PATH = './token.json';
const content = await fs.readFile ('./credentials.json', 'utf8');
const keys = JSON.parse (content).web;

const oauth2Client = new google.auth.OAuth2 (
    keys.client_id,
    keys.client_secret,
    keys.redirect_uris [0] // This should be http://localhost:3000/oauth2callback
);

async function authentication () {
    return new Promise ((resolve, reject) => {
        const server = http.createServer (async (req, res) => {
            try {
                if (req.url?.includes ('/oauth2callback')) {
                    const host = req.headers.host?? 'localhost:3000';
                    const fullUrl = new URL (req.url, `http://${host}`);
                    const code = fullUrl.searchParams.get ('code');
                    res.writeHead (200, {
                        'Content-Type': 'text/plain',
                        'Connection': 'close'
                    });
                    res.end ('Authentication successful! You can close this tab.');
                    // Give the browser 500ms to receive the data before killing the server
                    setTimeout (() => {server.destroy ();}, 5000);
                    if (code) {
                        const {tokens} = await oauth2Client.getToken (code);
                        oauth2Client.setCredentials (tokens);
                        resolve (oauth2Client);
                    }
                }
            }
            catch (e) {reject (e);}
        });
        // Helper to force-close all connections
        const sockets = new Set <any> ();
        server.on ('connection', (socket) => {
            sockets.add (socket);
            socket.on ('close', () => sockets.delete (socket));
        });
        server.on ('error', (err) => {
            console.error ('Server error:', err);
            reject (err);
        });
        (server as any).destroy = () => {
            for (const socket of sockets) socket.destroy ();
            server.close ();
        };
        server.listen (3000, () => {
            const authorizeUrl = oauth2Client.generateAuthUrl ({
                access_type: 'offline',
                prompt: 'consent',
                scope: ['https://www.googleapis.com/auth/youtube.force-ssl'],
            });
            console.log ('Opening browser for authentication...');
            open (authorizeUrl);
        });
    });
}

async function run () {
    try {
        // Check if we already have a token
        try {
            const savedToken = await fs.readFile (TOKEN_PATH, 'utf8');
            oauth2Client.setCredentials (JSON.parse (savedToken));
            console.log ('Loaded existing tokens from storage.');
        }
        catch (e) {
            // If file doesn't exist, we must authenticate via browser
            console.log ('No existing tokens found. Starting browser auth...');
            await authentication ();
            // Save the tokens for next time
            const tokens = oauth2Client.credentials;
            await fs.writeFile (TOKEN_PATH, JSON.stringify (tokens));
            console.log ('Tokens saved to:', TOKEN_PATH);
        }
        const youtube = google.youtube ({version: 'v3', auth: oauth2Client as any});
        const response = await youtube.playlists.list ({
            mine: true,
            part: ['snippet', 'contentDetails'],
            maxResults: 50, // This increases the "page size" from 5 to 50
        });
        console.log ('\n--- Your YouTube Playlists ---');
        response.data.items?.forEach (
                playlist => {
                    console.log (
                        `> ${playlist.snippet?.title} (ID: ${playlist.id})`
                    );
                }
        );
    }
    catch (err) {console.error ('Error during spike:', err);}
}

run ();
