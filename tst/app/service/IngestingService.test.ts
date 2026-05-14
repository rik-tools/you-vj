
import {describe, it, expect, vi} from 'vitest';
import PlaylistItem           from '../../../src/type/domain/PlaylistItem.ts';
import PlaylistItemGateway    from '../../../src/port/outbound/PlaylistItemGateway.ts';
import PlaylistItemRepository from '../../../src/port/outbound/PlaylistItemRepository.ts';
import serviceIngesting   from '../../../src/app/service/IngestingService.ts';

const mockGateway: PlaylistItemGateway = {
    playlistItems: vi.fn ().mockResolvedValue ([
        {id: '1', videoId: 'v1', title: 'Track One', artist: 'Artist A', publishedAt: '2024-01-01'},
        {id: '2', videoId: 'v2', title: 'Track Two', artist: 'Artist B', publishedAt: '2024-01-02'}
    ])
};

const mockRepository: PlaylistItemRepository = {
    upsertPlaylistItems: vi.fn ().mockResolvedValue (undefined)
};

describe ('serviceIngesting', () => {
    it ('calls playlistItemGateway and playlistItemRepository', async () => {
        await serviceIngesting (mockGateway, mockRepository);
        expect (mockRepository.upsertPlaylistItems).toHaveBeenCalledWith ([
            {id: '1', videoId: 'v1', title: 'Track One', artist: 'Artist A', publishedAt: '2024-01-01'},
            {id: '2', videoId: 'v2', title: 'Track Two', artist: 'Artist B', publishedAt: '2024-01-02'}
        ]);
    });
});
