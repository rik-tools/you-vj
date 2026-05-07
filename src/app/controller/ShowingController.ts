
import {Auth}          from 'googleapis';
import PlaylistGateway   from '../../port/outbound/PlaylistGateway.ts';
import PlaylistConsole   from '../../port/outbound/PlaylistConsole.ts';
import oauth2Client      from '../../adapter/outbound/OAuth2Client.ts'
import ytPlaylistAdapter from '../../adapter/outbound/YTPlaylistAdapter.ts';
import consolePlaylistAdapter from '../../adapter/outbound/ConsolePlaylistAdapter.ts';
import showPlaylists from '../service/ShowingService.ts';

type OAuth2Client = Auth.OAuth2Client;

export default async function controlShowing (): Promise <void> {
    const client: OAuth2Client = await oauth2Client ();
    const playlistGateway: PlaylistGateway = await ytPlaylistAdapter (client);
    const playlistConsole: PlaylistConsole = consolePlaylistAdapter ();
    await showPlaylists (playlistGateway, playlistConsole);
}
