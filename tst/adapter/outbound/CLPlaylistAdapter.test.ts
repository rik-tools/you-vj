
import PlaylistIdentity       from '../../../src/type/domain/PlaylistIdentity.ts';
import PlaylistConsole        from '../../../src/port/outbound/PlaylistConsole.ts';
import clPlaylistAdapter from '../../../src/adapter/outbound/CLPlaylistAdapter.ts';
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';

beforeEach (() => {vi.spyOn (console, 'log').mockImplementation (() => {});});
afterEach  (() => {vi.restoreAllMocks ();});

describe ('CLPlaylistAdapter', () => {

    it ('prints nothing for an empty list', () => {
        const adapter: PlaylistConsole = clPlaylistAdapter ();
        adapter.printPlaylists ([]);
        expect (console.log).not.toHaveBeenCalled ();
    });

    it ('prints a single identity correctly', () => {
        const adapter: PlaylistConsole = clPlaylistAdapter ();
        const identity: PlaylistIdentity = {id: 'pl-1', name: 'My Playlist'};
        adapter.printPlaylists ([identity]);
        expect (console.log).toHaveBeenCalledOnce ();
        expect (console.log).toHaveBeenCalledWith ('pl-1', 'My Playlist');
    });

    it ('prints multiple identities in order', () => {
        const adapter: PlaylistConsole = clPlaylistAdapter ();
        const identities: PlaylistIdentity [] = [
            {id: 'pl-1', name: 'First Playlist'},
            {id: 'pl-2', name: 'Second Playlist'}
        ];
        adapter.printPlaylists (identities);
        expect (console.log).toHaveBeenCalledTimes (2);
        expect (console.log).toHaveBeenNthCalledWith (1, 'pl-1', 'First Playlist');
        expect (console.log).toHaveBeenNthCalledWith (2, 'pl-2', 'Second Playlist');
    });

});
