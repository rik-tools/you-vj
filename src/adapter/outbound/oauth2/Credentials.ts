
import fs from 'fs/promises';
import Secrets from '../../../type/config/Secrets.ts';

export default async function credentials (credsPath: string): Promise <Secrets> {
    const content: string = await fs.readFile (credsPath, 'utf8');
    const json: Record <string, any> = JSON.parse (content);
    const keys: Record <string, any> = json.installed || json.web;
    return {
        client_id: keys.client_id,
        client_secret: keys.client_secret,
        redirect_uri: keys.redirect_uris [0]
    };
}
