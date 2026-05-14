
import {google} from 'googleapis';
import PlaylistItemGateway  from '../../port/outbound/PlaylistItemGateway.ts';
import PlaylistItem         from '../../type/domain/PlaylistItem.ts';
import OAuth2Client         from '../../port/outbound/OAuth2Client.ts';
import {Youtube, YTPlaylistItem} from '../../type/config/YouTube.ts';

export default async function ytPlaylistItemAdapter (client: OAuth2Client, playlistId: string): Promise <PlaylistItemGateway> {
    const youtube: Youtube = google.youtube ({version: 'v3', auth: client});
    async function playlistItems (): Promise <PlaylistItem []> {
        const response: any = await youtube.playlistItems.list ({
            playlistId: playlistId,
            part: ['snippet'],
            maxResults: 50
        });
        const items: YTPlaylistItem [] = response.data.items?? [];
        return items.map ((item: YTPlaylistItem) => {
            return {
                id: item.id?? '',
                videoId: item.snippet?.resourceId?.videoId?? '',
                title: item.snippet?.title?? 'Unknown',
                artist: item.snippet?.videoOwnerChannelTitle?? 'Unknown',
                publishedAt: item.snippet?.publishedAt?? new Date ().toISOString ()
            };
        }).filter ((item: PlaylistItem): item is PlaylistItem => !!item.videoId);
    }
    return {playlistItems};
}
