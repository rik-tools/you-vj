
import PlaylistIdentity from '../../domain/PlaylistIdentity.ts';
import PlaylistGateway  from '../../port/outbound/PlaylistGateway.ts';
import PlaylistConsole  from '../../port/outbound/PlaylistConsole.ts';

export default async function showPlaylists (
    playlistGateway: PlaylistGateway,
    playlistConsole: PlaylistConsole
): Promise <void> {
    const playlists: PlaylistIdentity [] = await playlistGateway.playlists ();
    playlistConsole.printPlaylists (playlists);
}
