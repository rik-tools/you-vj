
import {Auth, google, youtube_v3} from 'googleapis';
import PlaylistItemGateway        from '../../port/outbound/PlaylistItemGateway.ts';
import PlaylistItem               from '../../domain/PlaylistItem.ts';

type OAuth2Client = Auth.OAuth2Client;
type Youtube = youtube_v3.Youtube;
type Schema$PlaylistItem = youtube_v3.Schema$PlaylistItem;

export default async function ytPlaylistItemAdapter (client: OAuth2Client, playlistName: string): Promise <PlaylistItemGateway> {
    const youtube: Youtube = google.youtube ({version: 'v3', auth: client});
    async function playlistItems (): Promise <PlaylistItem []> {
        const response: any = await youtube.playlistItems.list ({
            playlistId: playlistName,
            part: ['snippet'],
            maxResults: 50
        });
        const items: Schema$PlaylistItem [] = response.data.items?? [];
        return items.map ((item: Schema$PlaylistItem) => {
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
