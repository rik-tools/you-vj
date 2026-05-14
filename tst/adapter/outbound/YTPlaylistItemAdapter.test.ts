
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import OAuth2Client from '../../../src/port/outbound/OAuth2Client.ts';
import PlaylistItem from '../../../src/type/domain/PlaylistItem.ts';
import PlaylistItemGateway from '../../../src/port/outbound/PlaylistItemGateway.ts';
import ytPlaylistItemAdapter from '../../../src/adapter/outbound/YTPlaylistItemAdapter.ts';

const mockPlaylistItemsList = vi.fn ();

vi.mock ('googleapis', () => ({
    google: {
        youtube: () => ({
            playlistItems: {list: mockPlaylistItemsList}
        })
    },
    Auth: {}
}));

const client = {} as OAuth2Client;

beforeEach (() => {vi.clearAllMocks ();});
afterEach  (() => {vi.restoreAllMocks ();});

describe ('YTPlaylistItemAdapter', () => {

    it ('maps a normal response to PlaylistItem array', async () => {
        mockPlaylistItemsList.mockResolvedValue ({
            data: {
                items: [
                    {
                        id: 'id-1',
                        snippet: {
                            resourceId: {videoId: 'vid-1'},
                            title: 'Title One',
                            videoOwnerChannelTitle: 'Artist One',
                            publishedAt: '2024-01-01T00:00:00Z'
                        }
                    },
                    {
                        id: 'id-2',
                        snippet: {
                            resourceId: {videoId: 'vid-2'},
                            title: 'Title Two',
                            videoOwnerChannelTitle: 'Artist Two',
                            publishedAt: '2024-01-02T00:00:00Z'
                        }
                    }
                ]
            }
        });
        const adapter: PlaylistItemGateway = await ytPlaylistItemAdapter (client, 'pl-1');
        const result: PlaylistItem [] = await adapter.playlistItems ();
        expect (result).toEqual ([
            {id: 'id-1', videoId: 'vid-1', title: 'Title One', artist: 'Artist One', publishedAt: '2024-01-01T00:00:00Z'},
            {id: 'id-2', videoId: 'vid-2', title: 'Title Two', artist: 'Artist Two', publishedAt: '2024-01-02T00:00:00Z'}
        ]);
    });

    it ('filters out items missing videoId', async () => {
        mockPlaylistItemsList.mockResolvedValue ({
            data: {
                items: [
                    {
                        id: 'id-1',
                        snippet: {
                            resourceId: {videoId: 'vid-1'},
                            title: 'Valid Title',
                            videoOwnerChannelTitle: 'Valid Artist',
                            publishedAt: '2024-01-01T00:00:00Z'
                        }
                    },
                    {
                        id: 'id-2',
                        snippet: {
                            resourceId: {},
                            title: 'No Video Id',
                            videoOwnerChannelTitle: 'Some Artist',
                            publishedAt: '2024-01-02T00:00:00Z'
                        }
                    }
                ]
            }
        });
        const adapter: PlaylistItemGateway = await ytPlaylistItemAdapter (client, 'pl-1');
        const result: PlaylistItem [] = await adapter.playlistItems ();
        expect (result).toHaveLength (1);
        expect (result [0].videoId).toBe ('vid-1');
    });

    it ('substitutes defaults for missing optional fields', async () => {
        mockPlaylistItemsList.mockResolvedValue ({
            data: {
                items: [
                    {
                        id: 'id-1',
                        snippet: {
                            resourceId: {videoId: 'vid-1'}
                        }
                    }
                ]
            }
        });
        const adapter: PlaylistItemGateway = await ytPlaylistItemAdapter (client, 'pl-1');
        const result: PlaylistItem [] = await adapter.playlistItems ();
        expect (result).toHaveLength (1);
        expect (result [0].title).toBe ('Unknown');
        expect (result [0].artist).toBe ('Unknown');
        expect (result [0].publishedAt).toBeTruthy ();
    });

    it ('returns an empty array when items is null or undefined', async () => {
        mockPlaylistItemsList.mockResolvedValue ({data: {}});
        const adapter: PlaylistItemGateway = await ytPlaylistItemAdapter (client, 'pl-1');
        const result: PlaylistItem [] = await adapter.playlistItems ();
        expect (result).toEqual ([]);
    });

});
