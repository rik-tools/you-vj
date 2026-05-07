
import {Auth}                 from "googleapis";
import oauth2Client           from "../../adapter/outbound/OAuth2Client.ts";
import ytPlaylistItemAdapter  from "../../adapter/outbound/YTPlaylistItemAdapter.ts";
import dbPlaylistItemAdapter  from "../../adapter/outbound/DBPlaylistItemAdapter.ts";
import persistPlaylistItems   from "../service/IngestingService.ts";
import PlaylistItemGateway    from '../../port/outbound/PlaylistItemGateway.ts';
import PlaylistItemRepository from '../../port/outbound/PlaylistItemRepository.ts';

type OAuth2Client = Auth.OAuth2Client;

export default async function controlIngesting (playlistName: string): Promise <void> {
    const client: OAuth2Client = await oauth2Client ();
    const gateway: PlaylistItemGateway = await ytPlaylistItemAdapter (client, playlistName);
    const repository: PlaylistItemRepository = await dbPlaylistItemAdapter ();
    persistPlaylistItems (gateway, repository);
}
