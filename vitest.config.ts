import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        projects: ['website', '!vitest.config.ts'],
    },
})
