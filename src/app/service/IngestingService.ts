
import PlaylistItem           from '../../type/domain/PlaylistItem.ts';
import PlaylistItemGateway    from '../../port/outbound/PlaylistItemGateway.ts';
import PlaylistItemRepository from '../../port/outbound/PlaylistItemRepository.ts';

export default async function persistPlaylistItems (gateway: PlaylistItemGateway, repository: PlaylistItemRepository): Promise <void> {
    const items: PlaylistItem [] = await gateway.playlistItems ();
    await repository.upsertPlaylistItems (items);
}
