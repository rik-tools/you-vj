
import {vi, describe, beforeEach, afterEach, it, expect} from 'vitest';

const mockReadFile              = vi.hoisted (() => vi.fn ());
const mockOAuth2Client          = vi.hoisted (() => vi.fn ());
const mockYTPlaylistItemAdapter = vi.hoisted (() => vi.fn ());
const mockDBPlaylistItemAdapter = vi.hoisted (() => vi.fn ());
const mockDBPlaylistAdapter     = vi.hoisted (() => vi.fn ());
const mockServiceIngesting      = vi.hoisted (() => vi.fn ());

vi.mock ('fs/promises',                                            () => ({default: {readFile: mockReadFile}}));
vi.mock ('../../../src/adapter/outbound/oauth2/Client.ts',         () => ({default: mockOAuth2Client}));
vi.mock ('../../../src/adapter/outbound/YTPlaylistItemAdapter.ts', () => ({default: mockYTPlaylistItemAdapter}));
vi.mock ('../../../src/adapter/outbound/DBPlaylistItemAdapter.ts', () => ({default: mockDBPlaylistItemAdapter}));
vi.mock ('../../../src/adapter/outbound/DBPlaylistAdapter.ts',     () => ({default: mockDBPlaylistAdapter}));
vi.mock ('../../../src/app/service/IngestingService.ts',           () => ({default: mockServiceIngesting}));

import Paths                  from '../../../src/type/config/Paths.ts';
import OAuth2Client           from '../../../src/port/outbound/OAuth2Client.ts';
import PlaylistItemGateway    from '../../../src/port/outbound/PlaylistItemGateway.ts';
import PlaylistItemRepository from '../../../src/port/outbound/PlaylistItemRepository.ts';
import controlIngesting       from '../../../src/app/controller/IngestingController.ts';

const fakePaths = (): Paths => ({
    dbPath:    'fake/db.sqlite',
    credsPath: 'fake/creds.json',
    tokenPath: 'fake/token.json',
    ddlPath:   'fake/ddl.sql',
    dmlPath:   'fake/dml.sql'
});

const fakeClient                 = (): OAuth2Client           => ({} as OAuth2Client);
const fakePlaylistItemGateway    = (): PlaylistItemGateway    => ({} as PlaylistItemGateway);
const fakePlaylistItemRepository = (): PlaylistItemRepository => ({} as PlaylistItemRepository);
const fakeDB                     = () => ({close: vi.fn ()});

describe ('controlIngesting', () => {

    beforeEach (() => {
        mockOAuth2Client.mockResolvedValue (fakeClient ());
        mockYTPlaylistItemAdapter.mockResolvedValue (fakePlaylistItemGateway ());
        mockDBPlaylistItemAdapter.mockReturnValue (fakePlaylistItemRepository ());
        mockDBPlaylistAdapter.mockReturnValue (fakeDB ());
        mockServiceIngesting.mockResolvedValue (undefined);
    });

    afterEach (() => {vi.resetAllMocks ();});

    it ('constructs ports and delegates to the ingesting service', async () => {
        const paths = fakePaths ();
        const playlistName: string = 'playlistName';
        const db = fakeDB ();
        mockDBPlaylistAdapter.mockResolvedValue (db);
        await controlIngesting (paths, playlistName);
        expect (mockDBPlaylistAdapter).toHaveBeenCalledWith (paths.dbPath, paths.ddlPath);
        expect (mockOAuth2Client).toHaveBeenCalledWith (paths.credsPath, paths.tokenPath);
        expect (mockYTPlaylistItemAdapter).toHaveBeenCalledWith (fakeClient (), playlistName);
        expect (mockDBPlaylistItemAdapter).toHaveBeenCalledWith (db, paths.dmlPath);
        expect (mockServiceIngesting).toHaveBeenCalledWith (fakePlaylistItemGateway (), fakePlaylistItemRepository ());
        expect (db.close).toHaveBeenCalled ();
    });

});

