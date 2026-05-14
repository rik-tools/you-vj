
import {vi, describe, beforeEach, afterEach, it, expect} from 'vitest';

const mockOAuth2Client      = vi.hoisted (() => vi.fn ());
const mockYTPlaylistAdapter = vi.hoisted (() => vi.fn ());
const mockCLPlaylistAdapter = vi.hoisted (() => vi.fn ());
const mockServiceShowing    = vi.hoisted (() => vi.fn ());

vi.mock ('../../../src/adapter/outbound/oauth2/Client.ts',      () => ({default: mockOAuth2Client}));
vi.mock ('../../../src/adapter/outbound/YTPlaylistAdapter.ts',  () => ({default: mockYTPlaylistAdapter}));
vi.mock ('../../../src/adapter/outbound/CLPlaylistAdapter.ts',  () => ({default: mockCLPlaylistAdapter}));
vi.mock ('../../../src/app/service/ShowingService.ts',          () => ({default: mockServiceShowing}));

import Paths from '../../../src/type/config/Paths.ts';
import OAuth2Client from '../../../src/port/outbound/OAuth2Client.ts';
import PlaylistGateway from '../../../src/port/outbound/PlaylistGateway.ts';
import PlaylistConsole from '../../../src/port/outbound/PlaylistConsole.ts';
import controlShowing from '../../../src/app/controller/ShowingController.ts';

const fakePaths = (): Paths => ({
    dbPath:    'fake/db.sqlite',
    credsPath: 'fake/creds.json',
    tokenPath: 'fake/token.json',
    ddlPath:   'fake/ddl.sql',
    dmlPath:   'fake/dml.sql'
});

const fakeClient          = (): OAuth2Client      => ({} as OAuth2Client);
const fakePlaylistGateway = (): PlaylistGateway   => ({} as PlaylistGateway);
const fakePlaylistConsole = (): PlaylistConsole   => ({} as PlaylistConsole);

describe ('controlShowing', () => {

    beforeEach (() => {
        mockOAuth2Client.mockResolvedValue (fakeClient ());
        mockYTPlaylistAdapter.mockResolvedValue (fakePlaylistGateway ());
        mockCLPlaylistAdapter.mockReturnValue (fakePlaylistConsole ());
        mockServiceShowing.mockResolvedValue (undefined);
    });

    afterEach (() => {vi.resetAllMocks ();});

    it ('constructs ports and delegates to the showing service', async () => {
        const paths = fakePaths ();
        await controlShowing (paths);
        expect (mockOAuth2Client).toHaveBeenCalledWith (paths.credsPath, paths.tokenPath);
        expect (mockYTPlaylistAdapter).toHaveBeenCalledWith (fakeClient ());
        expect (mockCLPlaylistAdapter).toHaveBeenCalled ();
        expect (mockServiceShowing).toHaveBeenCalledWith (fakePlaylistGateway (), fakePlaylistConsole ());
    });

});
