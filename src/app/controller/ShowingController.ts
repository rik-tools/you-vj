
import Paths                  from '../../type/config/Paths.ts';
import OAuth2Client           from '../../type/config/OAuth2Client.ts';
import PlaylistGateway        from '../../port/outbound/PlaylistGateway.ts';
import PlaylistConsole        from '../../port/outbound/PlaylistConsole.ts';
import oauth2Client           from '../../adapter/outbound/oauth2/Client.ts'
import ytPlaylistAdapter      from '../../adapter/outbound/YTPlaylistAdapter.ts';
import clPlaylistAdapter from '../../adapter/outbound/CLPlaylistAdapter.ts';
import showPlaylists          from '../service/ShowingService.ts';

export default async function controlShowing (paths: Paths): Promise <void> {
    const client: OAuth2Client = await oauth2Client (paths.credsPath, paths.tokenPath);
    const playlistGateway: PlaylistGateway = await ytPlaylistAdapter (client);
    const playlistConsole: PlaylistConsole = clPlaylistAdapter ();
    await showPlaylists (playlistGateway, playlistConsole);
}
