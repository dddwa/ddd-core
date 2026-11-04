import { beforeEach, describe, expect, it, vi } from 'vitest'

const manifestMock = vi.hoisted(() => ({
    conferenceManifest: {
        public: { name: 'Test Conf' },
        mobileApp: undefined as undefined | Record<string, unknown>,
    },
}))

vi.mock('@conference/manifest', () => manifestMock)

const loadAppPage = async () => {
    vi.resetModules()
    return (await import('./_layout.app')).loader
}

const maintained = {
    iosUrl: 'https://apps.apple.com/au/app/test/id1',
    androidUrl: 'https://play.google.com/store/apps/details?id=com.test',
}

describe('/app', () => {
    beforeEach(() => {
        manifestMock.conferenceManifest.mobileApp = undefined
    })

    it('renders the store links for a maintained app', async () => {
        manifestMock.conferenceManifest.mobileApp = { ...maintained }
        const loader = await loadAppPage()

        expect(loader()).toEqual({ iosUrl: maintained.iosUrl, androidUrl: maintained.androidUrl })
    })

    it('404s when the app is retired, so the website stops advertising it', async () => {
        manifestMock.conferenceManifest.mobileApp = { ...maintained, retired: true }
        const loader = await loadAppPage()

        expect(() => loader()).toThrowError(expect.objectContaining({ status: 404 }))
    })

    it('404s when the fork has no app', async () => {
        const loader = await loadAppPage()

        expect(() => loader()).toThrowError(expect.objectContaining({ status: 404 }))
    })
})
