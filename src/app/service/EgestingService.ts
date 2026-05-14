
import PlaylistSyncGateway from '../../port/outbound/PlaylistSyncGateway.ts';

export default async function serviceEgesting (gateway: PlaylistSyncGateway): Promise <void> {
    await gateway.carryPlaylist ();
}
