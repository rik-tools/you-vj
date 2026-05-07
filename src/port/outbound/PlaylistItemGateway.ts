
import PlaylistItem from '../../domain/PlaylistItem.ts';

export default interface PlaylistItemGateway {
    playlistItems (): Promise <PlaylistItem []>;
}
