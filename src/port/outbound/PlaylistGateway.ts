
import PlaylistIdentity from '../../type/domain/PlaylistIdentity.ts';

type PlaylistGateway = {
    playlists (): Promise <PlaylistIdentity []>;
}

export default PlaylistGateway;
