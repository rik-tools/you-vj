
import {defineConfig} from 'vitest/config';

export default defineConfig ({
    test: {
        global: true,
        environment: 'node',
        include: ['tst/**/*.test.ts'],
        slowTestThreshold: 1000
    }
})
