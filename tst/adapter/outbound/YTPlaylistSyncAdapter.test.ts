
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import OAuth2Client from '../../../src/type/config/OAuth2Client.ts';
import PlaylistSyncGateway   from '../../../src/port/outbound/PlaylistSyncGateway.ts';
import ytPlaylistSyncAdapter from '../../../src/adapter/outbound/YTPlaylistSyncAdapter.ts';

const client = {} as OAuth2Client;
const mockPlaylistsInsert     = vi.fn ();
const mockPlaylistItemsInsert = vi.fn ();

vi.mock ('googleapis', () => ({
    google: {
        youtube: () => ({
            playlists:     {insert: mockPlaylistsInsert},
            playlistItems: {insert: mockPlaylistItemsInsert}
        })
    },
    Auth: {}
}));

beforeEach (() => {vi.clearAllMocks ();});
afterEach  (() => {vi.restoreAllMocks ();});

describe ('YTPlaylistSyncAdapter', () => {

    it ('creates a playlist and inserts a single video', async () => {
        mockPlaylistsInsert.mockResolvedValue ({data: {id: 'pl-1'}});
        mockPlaylistItemsInsert.mockResolvedValue ({});
        const adapter: PlaylistSyncGateway = await ytPlaylistSyncAdapter (client, 'New Playlist', ['vid-1']);
        await adapter.carryPlaylist ();
        expect (mockPlaylistsInsert).toHaveBeenCalledOnce ();
        expect (mockPlaylistsInsert).toHaveBeenCalledWith ({
            part: ['snippet', 'status'],
            requestBody: {
                snippet: {title: 'New Playlist'},
                status:  {privacyStatus: 'private'}
            }
        });
        expect (mockPlaylistItemsInsert).toHaveBeenCalledOnce ();
        expect (mockPlaylistItemsInsert).toHaveBeenCalledWith ({
            part: ['snippet'],
            requestBody: {
                snippet: {
                    playlistId: 'pl-1',
                    resourceId: {kind: 'youtube#video', videoId: 'vid-1'}
                }
            }
        });
    });

    it ('inserts multiple videos in order', async () => {
        mockPlaylistsInsert.mockResolvedValue ({data: {id: 'pl-1'}});
        mockPlaylistItemsInsert.mockResolvedValue ({});
        const adapter: PlaylistSyncGateway = await ytPlaylistSyncAdapter (client, 'New Playlist', ['vid-1', 'vid-2', 'vid-3']);
        await adapter.carryPlaylist ();
        expect (mockPlaylistItemsInsert).toHaveBeenCalledTimes (3);
        expect (mockPlaylistItemsInsert).toHaveBeenNthCalledWith (1, {part: ['snippet'], requestBody: {snippet: {playlistId: 'pl-1', resourceId: {kind: 'youtube#video', videoId: 'vid-1'}}}});
        expect (mockPlaylistItemsInsert).toHaveBeenNthCalledWith (2, {part: ['snippet'], requestBody: {snippet: {playlistId: 'pl-1', resourceId: {kind: 'youtube#video', videoId: 'vid-2'}}}});
        expect (mockPlaylistItemsInsert).toHaveBeenNthCalledWith (3, {part: ['snippet'], requestBody: {snippet: {playlistId: 'pl-1', resourceId: {kind: 'youtube#video', videoId: 'vid-3'}}}});
    });

    it ('creates the playlist but inserts no videos for an empty list', async () => {
        mockPlaylistsInsert.mockResolvedValue ({data: {id: 'pl-1'}});
        const adapter: PlaylistSyncGateway = await ytPlaylistSyncAdapter (client, 'New Playlist', []);
        await adapter.carryPlaylist ();
        expect (mockPlaylistsInsert).toHaveBeenCalledOnce ();
        expect (mockPlaylistItemsInsert).not.toHaveBeenCalled ();
    });

});
