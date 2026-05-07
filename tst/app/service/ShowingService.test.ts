
import {describe, it, expect, vi} from 'vitest';
import PlaylistGateway   from '../../../src/port/outbound/PlaylistGateway.ts';
import PlaylistConsole   from '../../../src/port/outbound/PlaylistConsole.ts';
import showPlaylists from '../../../src/app/service/ShowingService.ts';

const mockPlaylistGateway: PlaylistGateway = {
    playlists: vi.fn ().mockResolvedValue ([
        {id: '1', name: 'List One'},
        {id: '2', name: 'List Two'}
    ])
};

const mockPlaylistConsole: PlaylistConsole = {
    printPlaylists: vi.fn ().mockResolvedValue (undefined)
};

describe ('showPlaylists', () => {
    it ('calls playlistGateway.playlists and playlistConsole.printPlaylists', async () => {
        await showPlaylists (mockPlaylistGateway, mockPlaylistConsole);
        expect (mockPlaylistGateway.playlists).toHaveBeenCalledWith ();
        expect (mockPlaylistConsole.printPlaylists).toHaveBeenCalledWith ([
            {id: '1', name: 'List One'},
            {id: '2', name: 'List Two'}
        ]);
    });
});
