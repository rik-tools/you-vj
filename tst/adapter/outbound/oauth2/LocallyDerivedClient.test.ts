
import fs from 'fs/promises';
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import OAuth2Client from '../../../../src/type/config/OAuth2Client.ts';
import locallyDerivedClient from '../../../../src/adapter/outbound/oauth2/LocallyDerivedClient.ts';

const mockSetCredentials     = vi.fn ();
const mockRefreshAccessToken = vi.fn ();

function fakeClient (expiryDate: number): OAuth2Client {
    return {
        credentials: {expiry_date: expiryDate},
        setCredentials: mockSetCredentials,
        refreshAccessToken: mockRefreshAccessToken
    } as unknown as OAuth2Client;
}

vi.mock ('fs/promises', () => ({
    default: {
        readFile:  vi.fn (),
        writeFile: vi.fn ()
    }
}));

beforeEach (() => {vi.clearAllMocks ();});
afterEach  (() => {vi.restoreAllMocks ();});

describe ('LocallyDerivedClient', () => {

    it ('returns the client with credentials set when token is valid', async () => {
        const expiry: number = Date.now () + 60_000;
        const token = {access_token: 'token-1', expiry_date: expiry};
        vi.mocked (fs.readFile).mockResolvedValue (JSON.stringify (token) as any);
        const client: OAuth2Client = fakeClient (expiry);
        const result: OAuth2Client = await locallyDerivedClient (client, '/fake/token.json');
        expect (mockSetCredentials).toHaveBeenCalledOnce ();
        expect (mockSetCredentials).toHaveBeenCalledWith (token);
        expect (result).toBe (client);
    });

    it ('refreshes and persists the token when expired', async () => {
        const expiry: number = Date.now () - 60_000;
        const oldToken = {access_token: 'old-token', expiry_date: expiry};
        const newTokens = {access_token: 'new-token', expiry_date: Date.now () + 60_000};
        vi.mocked (fs.readFile).mockResolvedValue (JSON.stringify (oldToken) as any);
        mockRefreshAccessToken.mockResolvedValue ({tokens: newTokens});
        const client: OAuth2Client = fakeClient (expiry);
        const result: OAuth2Client = await locallyDerivedClient (client, '/fake/token.json');
        expect (mockRefreshAccessToken).toHaveBeenCalledOnce ();
        expect (fs.writeFile).toHaveBeenCalledWith ('/fake/token.json', JSON.stringify (newTokens));
        expect (mockSetCredentials).toHaveBeenLastCalledWith (newTokens);
        expect (result).toBe (client);
    });

    it ('throws when the token file is not found', async () => {
        const error = Object.assign (new Error ('ENOENT'), {code: 'ENOENT'});
        vi.mocked (fs.readFile).mockRejectedValue (error);
        const client: OAuth2Client = fakeClient (0);
        await expect (locallyDerivedClient (client, '/fake/token.json')).rejects.toThrow ('ENOENT');
    });

});
