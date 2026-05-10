
import PlaylistItem from '../../type/domain/PlaylistItem.ts';

type PlaylistItemGateway = {
    playlistItems (): Promise <PlaylistItem []>;
}

export default PlaylistItemGateway;
