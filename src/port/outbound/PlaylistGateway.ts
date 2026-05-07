
import PlaylistIdentity from '../../domain/PlaylistIdentity.ts';

export default interface PlaylistGateway {
    playlists (): Promise <PlaylistIdentity []>;
}
