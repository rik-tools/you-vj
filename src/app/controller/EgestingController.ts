
import Paths                 from '../../type/config/Paths.ts';
import OAuth2Client          from '../../port/outbound/OAuth2Client.ts';
import PlaylistSyncGateway   from "../../port/outbound/PlaylistSyncGateway.ts";
import oauth2Client          from "../../adapter/outbound/oauth2/Client.ts";
import ytPlaylistSyncAdapter from "../../adapter/outbound/YTPlaylistSyncAdapter.ts";
import serviceEgesting   from "../../app/service/EgestingService.ts";

export default async function controlEgesting (paths: Paths, playlistName: string, videoIds: string []): Promise <void> {
    const client: OAuth2Client = await oauth2Client (paths.credsPath, paths.tokenPath);
    const gateway: PlaylistSyncGateway = await ytPlaylistSyncAdapter (client, playlistName, videoIds);
    serviceEgesting (gateway);
}
