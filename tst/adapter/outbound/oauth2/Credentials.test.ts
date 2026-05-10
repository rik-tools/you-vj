
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import Secrets from '../../../../src/type/config/Secrets.ts';
import credentials from '../../../../src/adapter/outbound/oauth2/Credentials.ts';

const {mockReadFile} = vi.hoisted (() => ({mockReadFile: vi.fn ()}));

const fakeSecrets: Secrets = {
    client_id:     'fake-client-id',
    client_secret: 'fake-client-secret',
    redirect_uri:  'http://localhost:3000'
};

const installedCredentialsFile: Record <string, any> = {installed: {client_id: 'fake-client-id', client_secret: 'fake-client-secret', redirect_uris: ['http://localhost:3000']}};

const webCredentialsFile: Record <string, any> = {web: {client_id: 'fake-client-id', client_secret: 'fake-client-secret', redirect_uris: ['http://localhost:3000']}};

vi.mock ('fs/promises', () => ({default: {readFile: mockReadFile}}));

beforeEach (() => {vi.clearAllMocks ();});
afterEach  (() => {vi.restoreAllMocks ();});

describe ('Credentials', () => {

    it ('parses an installed credentials file correctly', async () => {
        mockReadFile.mockResolvedValue (JSON.stringify (installedCredentialsFile));
        const result: Secrets = await credentials ('/fake/creds.json');
        expect (result).toEqual (fakeSecrets);
    });

    it ('parses a web credentials file correctly', async () => {
        mockReadFile.mockResolvedValue (JSON.stringify (webCredentialsFile));
        const result: Secrets = await credentials ('/fake/creds.json');
        expect (result).toEqual (fakeSecrets);
    });

    it ('throws when the credentials file is not found', async () => {
        const error = Object.assign (new Error ('ENOENT'), {code: 'ENOENT'});
        mockReadFile.mockRejectedValue (error);
        await expect (credentials ('/fake/creds.json')).rejects.toThrow ('ENOENT');
    });

});
