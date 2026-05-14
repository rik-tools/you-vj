
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import OAuth2Client      from '../../../src/port/outbound/OAuth2Client.ts';
import PlaylistGateway   from '../../../src/port/outbound/PlaylistGateway.ts';
import PlaylistIdentity  from '../../../src/type/domain/PlaylistIdentity.ts';
import ytPlaylistAdapter from '../../../src/adapter/outbound/YTPlaylistAdapter.ts';

const client = {} as OAuth2Client;
const mockPlaylistsList = vi.fn ();

vi.mock ('googleapis', () => ({
    google: {
        youtube: () => ({
            playlists: {list: mockPlaylistsList}
        })
    },
    Auth: {}
}));

beforeEach (() => {vi.clearAllMocks ();});
afterEach  (() => {vi.restoreAllMocks ();});

describe ('YTPlaylistAdapter', () => {

    it ('maps a normal response to PlaylistIdentity array', async () => {
        mockPlaylistsList.mockResolvedValue ({
            data: {
                items: [
                    {id: 'pl-1', snippet: {title: 'First Playlist'}},
                    {id: 'pl-2', snippet: {title: 'Second Playlist'}}
                ]
            }
        });
        const adapter: PlaylistGateway = await ytPlaylistAdapter (client);
        const result: PlaylistIdentity [] = await adapter.playlists ();
        expect (result).toEqual ([
            {id: 'pl-1', name: 'First Playlist'},
            {id: 'pl-2', name: 'Second Playlist'}
        ]);
    });

    it ('filters out items missing id or snippet title', async () => {
        mockPlaylistsList.mockResolvedValue ({
            data: {
                items: [
                    {id: 'pl-1', snippet: {title: 'Valid Playlist'}},
                    {id: 'pl-2', snippet: {}},
                    {snippet: {title: 'No Id Playlist'}},
                    {}
                ]
            }
        });
        const adapter: PlaylistGateway = await ytPlaylistAdapter (client);
        const result: PlaylistIdentity [] = await adapter.playlists ();
        expect (result).toEqual ([
            {id: 'pl-1', name: 'Valid Playlist'}
        ]);
    });

    it ('returns an empty array when items is empty', async () => {
        mockPlaylistsList.mockResolvedValue ({data: {items: []}});
        const adapter: PlaylistGateway = await ytPlaylistAdapter (client);
        const result: PlaylistIdentity [] = await adapter.playlists ();
        expect (result).toEqual ([]);
    });

});
