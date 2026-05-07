
import PlaylistSyncGateway from '../../port/outbound/PlaylistSyncGateway.ts';

export default async function persistPlaylistSync (gateway: PlaylistSyncGateway): Promise <void> {
    await gateway.carryPlaylist ();
}
