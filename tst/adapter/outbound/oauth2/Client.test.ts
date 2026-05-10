
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import OAuth2Client from '../../../../src/type/config/OAuth2Client.ts';

const {mockCredentials, mockLocallyDerivedClient, mockRemotelyDerivedClient, mockOAuth2Constructor} = vi.hoisted (() => ({
    mockCredentials:            vi.fn (),
    mockLocallyDerivedClient:   vi.fn (),
    mockRemotelyDerivedClient:  vi.fn (),
    mockOAuth2Constructor:      vi.fn ()
}));

vi.mock ('googleapis', () => ({google: {auth: {OAuth2: mockOAuth2Constructor}}}));
vi.mock ('../../../../src/adapter/outbound/oauth2/Credentials.ts',          () => ({default: mockCredentials}));
vi.mock ('../../../../src/adapter/outbound/oauth2/LocallyDerivedClient.ts',  () => ({default: mockLocallyDerivedClient}));
vi.mock ('../../../../src/adapter/outbound/oauth2/RemotelyDerivedClient.ts', () => ({default: mockRemotelyDerivedClient}));

import oauth2Client from '../../../../src/adapter/outbound/oauth2/Client.ts';

const fakeSecrets = {client_id: 'fake-client-id', client_secret: 'fake-client-secret', redirect_uri: 'http://localhost:3000'};
const fakeClient  = {} as unknown as OAuth2Client;

beforeEach (() => {
    vi.clearAllMocks ();
    mockCredentials.mockResolvedValue (fakeSecrets);
    mockOAuth2Constructor.mockImplementation (function () {return fakeClient;});
    vi.spyOn (console, 'error').mockImplementation (() => {});
});
afterEach  (() => {vi.restoreAllMocks ();});

describe ('Client', () => {

    it ('returns a locally derived client when token is valid', async () => {
        mockLocallyDerivedClient.mockResolvedValue (fakeClient);
        const result: OAuth2Client = await oauth2Client ('/fake/creds.json', '/fake/token.json');
        expect (mockLocallyDerivedClient).toHaveBeenCalledWith (fakeClient, '/fake/token.json');
        expect (mockRemotelyDerivedClient).not.toHaveBeenCalled ();
        expect (result).toBe (fakeClient);
    });

    it ('falls back to remotely derived client when local derivation fails', async () => {
        mockLocallyDerivedClient.mockRejectedValue (new Error ('No token file.'));
        mockRemotelyDerivedClient.mockResolvedValue (fakeClient);
        const result: OAuth2Client = await oauth2Client ('/fake/creds.json', '/fake/token.json');
        expect (mockLocallyDerivedClient).toHaveBeenCalledWith (fakeClient, '/fake/token.json');
        expect (mockRemotelyDerivedClient).toHaveBeenCalledWith (fakeClient, '/fake/token.json');
        expect (result).toBe (fakeClient);
    });

    it ('exits when credentials file is not found', async () => {
        const error = Object.assign (new Error ('ENOENT'), {code: 'ENOENT'});
        mockCredentials.mockRejectedValue (error);
        //const mockExit = vi.spyOn (process, 'exit').mockImplementation ((() => {}) as any);
        const mockExit = vi.spyOn (process, 'exit').mockImplementation ((() => {throw new Error ('process.exit');}) as any);
        //await oauth2Client ('/fake/creds.json', '/fake/token.json');
        await expect (oauth2Client ('/fake/creds.json', '/fake/token.json')).rejects.toThrow ('process.exit');
        //expect (mockExit).toHaveBeenCalledWith (1);
        expect (mockExit).toHaveBeenCalledWith (1);
    });

});
