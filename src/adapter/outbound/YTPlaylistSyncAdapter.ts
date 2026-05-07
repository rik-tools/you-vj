
import {Auth, google, youtube_v3} from "googleapis";
import PlaylistSyncGateway from "../../port/outbound/PlaylistSyncGateway.ts";

type Youtube = youtube_v3.Youtube;
type YTPlaylistResponse = Awaited <ReturnType <youtube_v3.Youtube ['playlists'] ['insert']>>;
type YTPlaylistItemResponse = Awaited <ReturnType <youtube_v3.Youtube ['playlistItems'] ['insert']>>;
type OAuth2Client = Auth.OAuth2Client;

async function createdYTPlaylistId (youtube: Youtube, playlistName: string): Promise <string> {
    const response = await youtube.playlists.insert ({
        part: ['snippet', 'status'],
        requestBody: {
            snippet: {title: playlistName},
            status: {privacyStatus: 'private'}
        }
    });
    const playlistId: string = response.data.id!;
    return playlistId;
}

async function insertYTPlaylistItem (youtube: Youtube, playlistId: string, videoIds: string []): Promise <void> {
    for (const videoId of videoIds) {
        await youtube.playlistItems.insert ({
            part: ['snippet'],
            requestBody: {
                snippet: {
                    playlistId: playlistId,
                    resourceId: {
                        kind: 'youtube#video',
                        videoId: videoId
                    }
                }
            }
        });
        await new Promise ((r: any) => setTimeout (r, 200));
    }
}

export default async function ytPlaylistSyncAdapter (client: OAuth2Client, playlistName: string, videoIds: string []): Promise <PlaylistSyncGateway> {
    const youtube: Youtube = google.youtube ({version: 'v3', auth: client});
    async function carryPlaylist (): Promise <void> {
        const playlistId: string = await createdYTPlaylistId (youtube, playlistName);
        await insertYTPlaylistItem (youtube, playlistId, videoIds);
    }
    return {carryPlaylist};
}
