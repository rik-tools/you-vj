
import http from 'http';
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import OAuth2Client from '../../../../src/port/outbound/OAuth2Client.ts';

const {mockReadFile, mockGetToken, mockSetCredentials} = vi.hoisted (() => ({
    mockReadFile:       vi.fn (),
    mockGetToken:       vi.fn (),
    mockSetCredentials: vi.fn ()
}));

vi.mock ('fs/promises', () => ({default: {writeFile: mockReadFile}}));

import requestListener from '../../../../src/adapter/outbound/oauth2/RequestListener.ts';

const fakeClient: OAuth2Client = {
    getToken:       mockGetToken,
    setCredentials: mockSetCredentials
} as unknown as OAuth2Client;

function fakeServer (): http.Server {
    return {
        closeAllConnections: vi.fn (),
        close:               vi.fn ()
    } as unknown as http.Server;
}

function fakeRequest (url: string): http.IncomingMessage {
    return {
        url,
        headers: {host: 'localhost:3000'}
    } as unknown as http.IncomingMessage;
}

function fakeResponse (): http.ServerResponse {
    return {
        writeHead: vi.fn (),
        end:       vi.fn ()
    } as unknown as http.ServerResponse;
}

beforeEach (() => {vi.clearAllMocks ();});
afterEach  (() => {vi.restoreAllMocks ();});

describe ('RequestListener', () => {

    it ('resolves the client when a valid code is received', async () => {
        const tokens = {access_token: 'new-token', expiry_date: Date.now () + 60_000};
        mockGetToken.mockResolvedValue ({tokens});
        const server   = fakeServer ();
        const resolve  = vi.fn ();
        const reject   = vi.fn ();
        const request  = fakeRequest ('/oauth2callback?code=auth-code-123');
        const response = fakeResponse ();
        const listener = requestListener (fakeClient, server, resolve, reject, '/fake/token.json');
        await listener (request, response);
        expect (mockGetToken).toHaveBeenCalledWith ('auth-code-123');
        expect (mockReadFile).toHaveBeenCalledWith ('/fake/token.json', JSON.stringify (tokens));
        expect (mockSetCredentials).toHaveBeenCalledWith (tokens);
        expect (resolve).toHaveBeenCalledWith (fakeClient);
        expect (reject).not.toHaveBeenCalled ();
    });

    it ('rejects when the callback arrives with no code', async () => {
        const server   = fakeServer ();
        const resolve  = vi.fn ();
        const reject   = vi.fn ();
        const request  = fakeRequest ('/oauth2callback');
        const response = fakeResponse ();
        const listener = requestListener (fakeClient, server, resolve, reject, '/fake/token.json');
        await listener (request, response);
        expect (reject).toHaveBeenCalledWith (expect.any (Error));
        expect (resolve).not.toHaveBeenCalled ();
        expect (server.closeAllConnections).toHaveBeenCalled ();
        expect (server.close).toHaveBeenCalled ();
    });

    it ('rejects when a request arrives at an unrecognised path', async () => {
        const server   = fakeServer ();
        const resolve  = vi.fn ();
        const reject   = vi.fn ();
        const request  = fakeRequest ('/unrecognised');
        const response = fakeResponse ();
        const listener = requestListener (fakeClient, server, resolve, reject, '/fake/token.json');
        await listener (request, response);
        expect (reject).toHaveBeenCalledWith (expect.any (Error));
        expect (resolve).not.toHaveBeenCalled ();
        expect (server.closeAllConnections).toHaveBeenCalled ();
        expect (server.close).toHaveBeenCalled ();
    });

    it ('rejects when an error is thrown during token exchange', async () => {
        const error = new Error ('Token exchange failed.');
        mockGetToken.mockRejectedValue (error);
        const server   = fakeServer ();
        const resolve  = vi.fn ();
        const reject   = vi.fn ();
        const request  = fakeRequest ('/oauth2callback?code=auth-code-123');
        const response = fakeResponse ();
        const listener = requestListener (fakeClient, server, resolve, reject, '/fake/token.json');
        await listener (request, response);
        expect (reject).toHaveBeenCalledWith (error);
        expect (resolve).not.toHaveBeenCalled ();
        expect (server.closeAllConnections).toHaveBeenCalled ();
        expect (server.close).toHaveBeenCalled ();
    });

});
