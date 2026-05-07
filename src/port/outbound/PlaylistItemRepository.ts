
import PlaylistItem from '../../domain/PlaylistItem.ts';

export default interface PlaylistItemRepository {
    upsertPlaylistItems (playlistItems: PlaylistItem []): Promise <void>;
}
