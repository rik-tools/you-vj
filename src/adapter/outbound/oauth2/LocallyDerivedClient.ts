
import fs from 'fs/promises';
import OAuth2Client from '../../../type/config/OAuth2Client.ts';

export default async function locallyDerivedClient (client: OAuth2Client, tokenPath: string): Promise <OAuth2Client> {
    const token: string = await fs.readFile (tokenPath, 'utf8');
    client.setCredentials (JSON.parse (token));
    const expiry: number = client.credentials.expiry_date?? 0;
    if (Date.now () >= expiry) {
        const {tokens}: any = await client.refreshAccessToken ();
        await fs.writeFile (tokenPath, JSON.stringify (tokens));
        client.setCredentials (tokens);
    }
    return client;
}
