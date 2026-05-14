
import {google} from 'googleapis';
import {Youtube, YTPlaylistResponse, YTPlaylistItemResponse} from '../../type/config/YouTube.ts';
import OAuth2Client                                          from '../../port/outbound/OAuth2Client.ts';
import PlaylistSyncGateway                                   from '../../port/outbound/PlaylistSyncGateway.ts';

export default async function ytPlaylistSyncAdapter (client: OAuth2Client, playlistName: string, videoIds: string []): Promise <PlaylistSyncGateway> {
    const youtube: Youtube = google.youtube ({version: 'v3', auth: client});
    async function carryPlaylist (): Promise <void> {
        const playlistId: string = await createdYTPlaylistId (youtube, playlistName);
        await insertYTPlaylistItem (youtube, playlistId, videoIds);
    }
    return {carryPlaylist};
}

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
