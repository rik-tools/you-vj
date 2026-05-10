
import Paths                 from '../../type/config/Paths.ts';
import OAuth2Client          from '../../type/config/OAuth2Client.ts';
import PlaylistSyncGateway   from "../../port/outbound/PlaylistSyncGateway.ts";
import oauth2Client          from "../../adapter/outbound/oauth2/Client.ts";
import ytPlaylistSyncAdapter from "../../adapter/outbound/YTPlaylistSyncAdapter.ts";
import persistPlaylistSync   from "../service/EgestingService.ts";

export default async function controlEgesting (playlistName: string, videoIds: string [], paths: Paths): Promise <void> {
    const client: OAuth2Client = await oauth2Client (paths.credsPath, paths.tokenPath);
    const gateway: PlaylistSyncGateway = await ytPlaylistSyncAdapter (client, playlistName, videoIds);
    persistPlaylistSync (gateway);
}
