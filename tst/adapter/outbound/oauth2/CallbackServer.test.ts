
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import OAuth2Client from '../../../../src/type/config/OAuth2Client.ts';

const {mockOpen, mockRequestListener} = vi.hoisted (() => ({
    mockOpen:            vi.fn (),
    mockRequestListener: vi.fn ()
}));

vi.mock ('open', () => ({default: mockOpen}));
vi.mock ('../../../../src/adapter/outbound/oauth2/RequestListener.ts', () => ({default: mockRequestListener}));

import callbackServer from '../../../../src/adapter/outbound/oauth2/CallbackServer.ts';

const fakeClient: OAuth2Client = {} as unknown as OAuth2Client;

beforeEach (() => {vi.clearAllMocks ();});
afterEach  (() => {vi.restoreAllMocks ();});

describe ('CallbackServer', () => {

    it ('attaches the request listener, opens the auth url and resolves the client', async () => {
        const fakeListener = vi.fn ();
        mockRequestListener.mockReturnValue (fakeListener);
        const promise = callbackServer (fakeClient, '/fake/token.json', 'http://fake-auth-url');
        await new Promise ((r) => setTimeout (r, 50));
        expect (mockRequestListener).toHaveBeenCalledWith (fakeClient, expect.any (Object), expect.any (Function), expect.any (Function), '/fake/token.json');
        expect (mockOpen).toHaveBeenCalledWith ('http://fake-auth-url');
        promise.catch (() => {});
    });

});
