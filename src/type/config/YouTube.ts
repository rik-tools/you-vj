
import {youtube_v3} from 'googleapis';
export type Youtube = youtube_v3.Youtube;
export type YTPlaylist = youtube_v3.Schema$Playlist;
export type YTPlaylistItem = youtube_v3.Schema$PlaylistItem;
export type YTPlaylistResponse = Awaited <ReturnType <youtube_v3.Youtube ['playlists'] ['insert']>>;
export type YTPlaylistItemResponse = Awaited <ReturnType <youtube_v3.Youtube ['playlistItems'] ['insert']>>;
