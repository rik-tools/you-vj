
import {vi, describe, beforeEach, afterEach, it, expect} from 'vitest';

const mockOAuth2Client          = vi.hoisted (() => vi.fn ());
const mockYTPlaylistSyncAdapter = vi.hoisted (() => vi.fn ());
const mockServiceEgesting       = vi.hoisted (() => vi.fn ());

vi.mock ('../../../src/adapter/outbound/oauth2/Client.ts',         () => ({default: mockOAuth2Client}));
vi.mock ('../../../src/adapter/outbound/YTPlaylistSyncAdapter.ts', () => ({default: mockYTPlaylistSyncAdapter}));
vi.mock ('../../../src/app/service/EgestingService.ts',            () => ({default: mockServiceEgesting}));

import Paths from '../../../src/type/config/Paths.ts';
import OAuth2Client from '../../../src/port/outbound/OAuth2Client.ts';
import PlaylistSyncGateway from '../../../src/port/outbound/PlaylistSyncGateway.ts';
import controlEgesting from '../../../src/app/controller/EgestingController.ts';

const fakePaths = (): Paths => ({
    dbPath:    'fake/sql.db',
    credsPath: 'fake/creds.json',
    tokenPath: 'fake/token.json',
    ddlPath:   'fake/ddl.sql',
    dmlPath:   'fake/dml.sql'
});

const fakeClient              = (): OAuth2Client        => ({} as OAuth2Client);
const fakePlaylistSyncGateway = (): PlaylistSyncGateway => ({} as PlaylistSyncGateway);

describe ('controlEgesting', () => {

    beforeEach (() => {
        mockOAuth2Client.mockResolvedValue (fakeClient ());
        mockYTPlaylistSyncAdapter.mockResolvedValue (fakePlaylistSyncGateway ());
        mockServiceEgesting.mockResolvedValue (undefined);
    });

    afterEach (() => {vi.resetAllMocks ();});

    it ('constructs ports and delegates to the egesting service', async () => {
        const paths = fakePaths ();
        const playlistName = 'playlist-name';
        const videoId = 'video-id-0';
        await controlEgesting (paths, playlistName, [videoId]);
        expect (mockOAuth2Client).toHaveBeenCalledWith (paths.credsPath, paths.tokenPath);
        expect (mockYTPlaylistSyncAdapter).toHaveBeenCalledWith (fakeClient (), playlistName, [videoId]);
        expect (mockServiceEgesting).toHaveBeenCalledWith (fakePlaylistSyncGateway ());
    });

});
