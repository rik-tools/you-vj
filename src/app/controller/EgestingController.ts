
import {Auth} from "googleapis";
import oauth2Client from "../../adapter/outbound/OAuth2Client.ts";
import PlaylistSyncGateway from "../../port/outbound/PlaylistSyncGateway.ts";
import ytPlaylistSyncAdapter from "../../adapter/outbound/YTPlaylistSyncAdapter.ts";
import persistPlaylistSync   from "../service/EgestingService.ts";

type OAuth2Client = Auth.OAuth2Client;

export default async function controlEgesting (playlistName: string, videoIds: string []): Promise <void> {
    const client: OAuth2Client = await oauth2Client ();
    const gateway: PlaylistSyncGateway = await ytPlaylistSyncAdapter (client, playlistName, videoIds);
    persistPlaylistSync (gateway);
}
