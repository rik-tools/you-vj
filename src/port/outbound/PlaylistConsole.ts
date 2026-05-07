
import PlaylistIdentity from '../../domain/PlaylistIdentity.ts';

export default interface PlaylistConsole {
    printPlaylists (playlistIdentities: PlaylistIdentity []): void;
}
