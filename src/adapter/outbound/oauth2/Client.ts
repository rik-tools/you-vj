
import fs from 'fs/promises';
import {google} from 'googleapis';
import Secrets from '../../../type/config/Secrets.ts';
import OAuth2Client from '../../../port/outbound/OAuth2Client.ts';
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
            console.error ('[5] Download the credentials from the GCP: APIs and Services: Credentials!');
            process.exit (5);
        }
        else {
            console.error ('[6] An unknown error occurred:\n' + error.message);
            process.exit (6);
        }
    }
}
