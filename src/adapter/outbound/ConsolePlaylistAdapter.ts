
import PlaylistIdentity from '../../domain/PlaylistIdentity.ts';
import PlaylistConsole  from '../../port/outbound/PlaylistConsole.ts';

export default function consolePlaylistAdapter (): PlaylistConsole {
    function printPlaylists (identities: PlaylistIdentity []): void {
        identities.forEach ((identity: PlaylistIdentity) => {console.log (identity.id, identity.name);});
    };
    return {printPlaylists};
}
