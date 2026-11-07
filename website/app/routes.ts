import { type RouteConfig } from '@react-router/dev/routes'
import { flatRoutes } from '@react-router/fs-routes'
import fs from 'node:fs'
import path from 'node:path'

// Colocated vitest files must be excluded or flatRoutes registers them as
// live routes (e.g. /voting/test) and bundles vitest into the worker.
const ignoredRouteFiles = ['**/*.test.*']

// A conference layer can add routes of its own in `routes/`, named the same
// way as these. It sits at `../../../conference` in a fork and at
// `../../conference-stub` standalone; found by looking, as vite.config.ts does
// for the wrangler configs. A missing `routes/` folder adds nothing.
const conferenceDir = ['../../../conference', '../../conference-stub'].find((dir) =>
    fs.existsSync(path.resolve(import.meta.dirname, dir, 'manifest.ts')),
)

// The ignore globs match paths relative to app/, and `**` never crosses the
// `..` that leads out to the conference layer, so they need its prefix.
const conferenceRoutes = (dir: string) =>
    flatRoutes({
        rootDirectory: `${dir}/routes`,
        ignoredRouteFiles: ignoredRouteFiles.map((glob) => `${dir}/routes/${glob}`),
    })

export default (async () => [
    ...(await flatRoutes({ ignoredRouteFiles })),
    ...(conferenceDir ? await conferenceRoutes(conferenceDir) : []),
])() satisfies RouteConfig
