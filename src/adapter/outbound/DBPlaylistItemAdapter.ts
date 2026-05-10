
import fs from "fs/promises";
import {Database} from 'sqlite';
import PlaylistItemRepository from '../../port/outbound/PlaylistItemRepository.ts';
import PlaylistItem from '../../type/domain/PlaylistItem.ts';

export default async function dbPlaylistItemAdapter (database: Database, dmlPath: string): Promise <PlaylistItemRepository> {
    async function upsertPlaylistItems (playlistItems: PlaylistItem []): Promise <void> {
        const sql: string = await fs.readFile (dmlPath, 'utf8');
        for (const item of playlistItems) {
            await database.run (sql, {
                ':id': item.id,
                ':videoId': item.videoId,
                ':title': item.title,
                ':artist': item.artist,
                ':publishedAt': item.publishedAt
            });
        }
    }
    return {upsertPlaylistItems}
}
