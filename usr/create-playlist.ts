
import {google} from 'googleapis';
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

async function run (): Promise <void> {
    try {
        // 2. Load the "Golden Ticket" (token.json)
        const tokenData = await fs.readFile (TOKEN_PATH, 'utf8');
        oauth2Client.setCredentials (JSON.parse (tokenData));
        const youtube = google.youtube ({version: 'v3', auth: oauth2Client as any});
        // 3. The Write Procedure
        console.log ('Creating "Spike Test Playlist"...');
        const response = await youtube.playlists.insert ({
            part: ['snippet', 'status'],
            requestBody: {
                snippet: {
                    title: 'Spike Test Playlist',
                    description: 'A successful result of Phase 3',
                },
                status: {privacyStatus: 'private'},
            }
        });
        console.log (`\n--- SUCCESS ---`);
        console.log (`Playlist created!`);
        console.log (`Title: ${response.data.snippet?.title}`);
        console.log (`ID:    ${response.data.id}`);
    }
    catch (err) {console.error ('Procedure failed:', err);}
}

run ();
