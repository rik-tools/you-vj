
import PlaylistIdentity from '../../type/domain/PlaylistIdentity.ts';
import PlaylistConsole  from '../../port/outbound/PlaylistConsole.ts';

export default function clPlaylistAdapter (): PlaylistConsole {
    function printPlaylists (identities: PlaylistIdentity []): void {
        identities.forEach ((identity: PlaylistIdentity) => {console.log (identity.id, identity.name);});
    };
    return {printPlaylists};
}
