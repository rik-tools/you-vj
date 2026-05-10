
import {google, youtube_v3} from 'googleapis';
import PlaylistGateway from '../../port/outbound/PlaylistGateway.ts';
import PlaylistIdentity from '../../type/domain/PlaylistIdentity.ts';
import OAuth2Client     from '../../type/config/OAuth2Client.ts';
import {Youtube, YTPlaylist} from '../../type/config/YouTube.ts';

export default async function ytPlaylistAdapter (client: OAuth2Client): Promise <PlaylistGateway> {
    const youtube: Youtube = google.youtube ({version: 'v3', auth: client});
    async function playlists (): Promise <PlaylistIdentity []> {
        const response: any = await youtube.playlists.list ({
            mine: true,
            part: ['snippet'],
            maxResults: 50
        });
        const items: YTPlaylist [] = response.data.items;
        return items
            .filter (
                (item): item is YTPlaylist & {id: string, snippet: {title: string}} =>
                    !!(item.id && item.snippet?.title)
            )
            .map ((item) => ({id: item.id, name: item.snippet!.title}));
    }
    return {playlists};
}
