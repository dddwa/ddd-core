import path from 'node:path'
import type { BrandAssets } from '@ddd/conference-config'
import type { Plugin } from 'vite'

// The logo and hero marks are imported as `?react` components, so they are
// compiled into the bundle and the `conference-public` URL overlay can't
// replace them. Before this plugin they lived in core/website/app/images/,
// and every fork had to overwrite them inside core/ — which then conflicted
// on `git subtree pull`.
//
// `virtual:conference-brand` re-exports the fork's files through the same
// `?react` query, so svgr (registered separately in vite.config.ts) still
// does the compiling and call sites only change their import specifier.

const ID = 'virtual:conference-brand'
const RESOLVED = '\0virtual:conference-brand'

export function conferenceBrandPlugin(brandAssets: BrandAssets): Plugin {
    const svgImport = (file: string) => JSON.stringify(`${path.resolve(file)}?react`)

    return {
        name: 'dddperth:conference-brand',

        resolveId(id) {
            if (id === ID) return RESOLVED
        },

        load(id) {
            if (id !== RESOLVED) return
            return [
                `import Logo from ${svgImport(brandAssets.logo)}`,
                ...brandAssets.heroMarks.map((file, i) => `import HeroMark${i} from ${svgImport(file)}`),
                `export { Logo }`,
                `export const heroMarks = [${brandAssets.heroMarks.map((_, i) => `HeroMark${i}`).join(', ')}]`,
            ].join('\n')
        },
    }
}
