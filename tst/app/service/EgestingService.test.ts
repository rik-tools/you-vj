
import {describe, it, expect, vi} from 'vitest';
import PlaylistSyncGateway from '../../../src/port/outbound/PlaylistSyncGateway.ts';
import serviceEgesting from '../../../src/app/service/EgestingService.ts';

const mockGateway: PlaylistSyncGateway = {
    carryPlaylist: vi.fn ().mockResolvedValue (undefined)
};

describe ('carryPlaylist', () => {
    it ('calls playlistSyncGateway', async () => {
        await serviceEgesting (mockGateway);
        expect (mockGateway.carryPlaylist).toHaveBeenCalled ();
    });
});
