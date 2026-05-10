
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import OAuth2Client from '../../../../src/type/config/OAuth2Client.ts';
import remotelyDerivedClient from '../../../../src/adapter/outbound/oauth2/RemotelyDerivedClient.ts';

const {mockGenerateAuthUrl, mockCallbackServer} = vi.hoisted (() => ({
    mockGenerateAuthUrl: vi.fn (),
    mockCallbackServer:  vi.fn ()
}));

vi.mock ('../../../../src/adapter/outbound/oauth2/CallbackServer.ts', () => ({
    default: mockCallbackServer
}));

function fakeClient (): OAuth2Client {
    return {
        generateAuthUrl: mockGenerateAuthUrl
    } as unknown as OAuth2Client;
}

beforeEach (() => {vi.clearAllMocks (); mockGenerateAuthUrl.mockReturnValue ('http://fake-auth-url');});
afterEach  (() => {vi.restoreAllMocks ();});

describe ('RemotelyDerivedClient', () => {

    it ('generates the auth url and delegates to callbackServer', async () => {
        const client: OAuth2Client = fakeClient ();
        mockCallbackServer.mockResolvedValue (client);
        const result: OAuth2Client = await remotelyDerivedClient (client, '/fake/token.json');
        expect (mockGenerateAuthUrl).toHaveBeenCalledOnce ();
        expect (mockCallbackServer).toHaveBeenCalledWith (client, '/fake/token.json', 'http://fake-auth-url');
        expect (result).toBe (client);
    });

});
