
import {Database}             from 'sqlite';
import Paths                  from '../../type/config/Paths.ts';
import PlaylistItem           from "../../type/domain/PlaylistItem.ts";
import OAuth2Client           from '../../port/outbound/OAuth2Client.ts';
import PlaylistItemGateway    from '../../port/outbound/PlaylistItemGateway.ts';
import PlaylistItemRepository from '../../port/outbound/PlaylistItemRepository.ts';
import oauth2Client           from "../../adapter/outbound/oauth2/Client.ts";
import dbPlaylistAdapter      from '../../adapter/outbound/DBPlaylistAdapter.ts';
import dbPlaylistItemAdapter  from "../../adapter/outbound/DBPlaylistItemAdapter.ts";
import ytPlaylistItemAdapter  from "../../adapter/outbound/YTPlaylistItemAdapter.ts";
import serviceIngesting       from "../../app/service/IngestingService.ts";

export default async function controlIngesting (paths: Paths, playlistName: string): Promise <void> {
    const db: Database = await dbPlaylistAdapter (paths.dbPath, paths.ddlPath);
    const client: OAuth2Client = await oauth2Client (paths.credsPath, paths.tokenPath);
    const gateway: PlaylistItemGateway = await ytPlaylistItemAdapter (client, playlistName);
    const repository: PlaylistItemRepository = await dbPlaylistItemAdapter (db, paths.dmlPath);
    await serviceIngesting (gateway, repository);
    await db.close ();
}
