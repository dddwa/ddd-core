// @vitest-environment jsdom
/**
 * Every loader revalidation hands the page new `conferenceState` and
 * `ticketSponsors` objects with the same contents. If anything in
 * useMdxPage builds a component from them, that's a new component type each
 * time, and React remounts the whole MDX tree, dropping any state inside it
 * (a half-filled volunteer or ticket form). Lint doesn't catch it, so this
 * does: same DOM node before and after means nothing remounted.
 */
import { cleanup, render, screen } from '@testing-library/react'
import type { MDXComponents } from 'mdx/types'
import { Suspense } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ConferenceState } from './conference-state-client-safe'
import { useMdxPage } from './mdx'

vi.mock('virtual:mdx-bundles', () => {
    // Stands in for a compiled page: plain markdown plus one of the MDX
    // components that reads the route's data.
    const mod = {
        default: ({
            components,
        }: {
            components: MDXComponents & Record<string, React.ComponentType<{ children?: React.ReactNode }>>
        }) => (
            <>
                <p data-testid="body">Body</p>
                <components.VolunteersNeeded>
                    <p>Volunteers needed</p>
                </components.VolunteersNeeded>
            </>
        ),
    }
    // ES module imports are singletons, so a real entry's load() always
    // resolves the same module. Marked settled the way React marks a promise
    // it has seen, so use() reads it without suspending and the test doesn't
    // depend on Suspense timing.
    const loaded = Object.assign(Promise.resolve(mod), { status: 'fulfilled', value: mod })
    return { default: { page: { test: { frontmatter: {}, load: () => loaded } }, blog: {} } }
})

afterEach(cleanup)

const state = (needsVolunteers: boolean) =>
    ({ conference: { year: '2026' }, volunteering: { needsVolunteers } }) as unknown as ConferenceState

function Page({ conferenceState }: { conferenceState: ConferenceState }) {
    return useMdxPage('test', 'page', conferenceState, { currentYear: '2026', sponsors: [], isFallback: false })
}

const renderPage = (conferenceState: ConferenceState) => (
    <Suspense>
        <Page conferenceState={conferenceState} />
    </Suspense>
)

describe('useMdxPage', () => {
    it('keeps the MDX tree mounted when the loader data is replaced', async () => {
        const { rerender } = render(renderPage(state(false)))
        const body = await screen.findByTestId('body')

        rerender(renderPage(structuredClone(state(false))))

        expect(screen.getByTestId('body')).toBe(body)
    })

    it('still shows the new data, without remounting', async () => {
        const { rerender } = render(renderPage(state(false)))
        const body = await screen.findByTestId('body')
        expect(screen.queryByText('Volunteers needed')).toBeNull()

        rerender(renderPage(state(true)))

        expect(screen.getByText('Volunteers needed')).toBeTruthy()
        expect(screen.getByTestId('body')).toBe(body)
    })
})
