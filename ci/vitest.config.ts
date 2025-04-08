import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            exclude: ['./ci/', ...coverageConfigDefaults.exclude],
            reporter: ['html'],
            reportsDirectory: './ci/coverage/'
        },
        typecheck: {
            enabled: true
        }
    }
});
