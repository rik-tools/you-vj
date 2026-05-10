
import PlaylistItem from '../../type/domain/PlaylistItem.ts';

type PlaylistItemRepository = {
    upsertPlaylistItems (playlistItems: PlaylistItem []): Promise <void>;
}

export default PlaylistItemRepository;
