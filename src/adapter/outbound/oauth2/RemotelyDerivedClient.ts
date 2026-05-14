
import OAuth2Client from '../../../port/outbound/OAuth2Client.ts';
import callbackServer from './CallbackServer.ts'

export default async function remotelyDerivedClient (client: OAuth2Client, tokenPath: string): Promise <OAuth2Client> {
    const authorisingUrl: string = client.generateAuthUrl ({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['https://www.googleapis.com/auth/youtube.force-ssl'],
    });
    return await callbackServer (client, tokenPath, authorisingUrl);
}
