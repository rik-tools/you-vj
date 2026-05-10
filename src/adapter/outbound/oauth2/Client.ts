
import fs from 'fs/promises';
import {google} from 'googleapis';
import Secrets from '../../../type/config/Secrets.ts';
import OAuth2Client from '../../../type/config/OAuth2Client.ts';
import credentials from './Credentials.ts';
import locallyDerivedClient from './LocallyDerivedClient.ts';
import remotelyDerivedClient from './RemotelyDerivedClient.ts';

const OAuth2: typeof google.auth.OAuth2 = google.auth.OAuth2;

export default async function oauth2Client (credsPath: string, tokenPath: string): Promise <OAuth2Client> {
    try {
        const secrets: Secrets = await credentials (credsPath);
        const client: OAuth2Client = new OAuth2 (secrets.client_id, secrets.client_secret, secrets.redirect_uri);
        try {return await locallyDerivedClient (client, tokenPath);}
        catch (error: unknown) {return await remotelyDerivedClient (client, tokenPath);}
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
