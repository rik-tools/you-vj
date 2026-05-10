
import http from 'http';
import open from 'open';
import OAuth2Client from '../../../type/config/OAuth2Client.ts';
import requestListener from './RequestListener.ts';

type Promisable = (resolve: (value: OAuth2Client) => void, reject: (reason?: any) => void) => void;

export default function callbackServer (client: OAuth2Client, tokenPath: string, authorisingUrl: string): Promise <OAuth2Client>
{return new Promise (promisable (client, tokenPath, authorisingUrl));}

function promisable (client: OAuth2Client, tokenPath: string, authorisingUrl: string): Promisable {
    return (resolve: (v: OAuth2Client) => void, reject: (e: unknown) => void): void => {
        const server: http.Server = http.createServer ();
        const respond: http.RequestListener = requestListener (client, server, resolve, reject, tokenPath);
        server.on ('request', respond);
        server.listen (3000, () => {open (authorisingUrl);});
    }
}
