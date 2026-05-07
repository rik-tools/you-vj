
import {Auth, google, youtube_v3} from 'googleapis';
import PlaylistGateway from '../../port/outbound/PlaylistGateway.ts';
import PlaylistIdentity from '../../domain/PlaylistIdentity.ts';

type OAuth2Client = Auth.OAuth2Client;
type Youtube = youtube_v3.Youtube;
type Schema$Playlist = youtube_v3.Schema$Playlist;

export default async function ytPlaylistAdapter (client: OAuth2Client): Promise <PlaylistGateway> {
    const youtube: Youtube = google.youtube ({version: 'v3', auth: client});
    async function playlists (): Promise <PlaylistIdentity []> {
        const response: any = await youtube.playlists.list ({
            mine: true,
            part: ['snippet'],
            maxResults: 50
        });
        const items: Schema$Playlist [] = response.data.items;
        return items
            .filter (
                (item): item is Schema$Playlist & {id: string, snippet: {title: string}} =>
                    !!(item.id && item.snippet?.title)
            )
            .map ((item) => ({id: item.id, name: item.snippet!.title}));
    }
    return {playlists};
}
