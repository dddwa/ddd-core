import type { Temporal } from '~/lib/dates/temporal'
import { conferenceTime } from '~/lib/dates/temporal'
import type { MDXComponents } from 'mdx/types'
import type { ComponentType, ReactElement, ReactNode } from 'react'
import { createContext, use } from 'react'
import bundles from 'virtual:mdx-bundles'
import { MdxImage } from '~/components/mdx-image'
import {
    Bullet,
    Card,
    CardGrid,
    CTA,
    Hero,
    PastSponsorsGrid,
    Section,
    SponsorQuotes,
    Stat,
    Stats,
} from '~/components/mdx-primitives'
import { SponsorAcknowledgement } from '~/components/sponsor-acknowledgement'
import { TicketForm } from '~/components/page-components/TicketForm'
import { VolunteerForm } from '~/components/page-components/VolunteerForm'
import { Button } from '~/components/ui/button'
import { styled } from '~/styled-system/jsx'
import type { ConferenceState, Sponsor, Year } from './conference-state-client-safe'
import { AppLink } from '~/components/app-link'
import { NewTabHint } from '~/components/new-tab-hint'

type ContentType = 'page' | 'blog'

/**
 * Sponsors surfaced inside MDX components — resolved server-side (so the
 * fallback helper can read `conferenceConfig`) and passed in by the route.
 */
export interface MdxSponsorContext {
    /** Year used to label CTAs (e.g. "Sponsor 2026"). Always the active year. */
    currentYear: Year
    /** Sponsors to credit. Empty when no current sponsors and no fallback. */
    sponsors: Sponsor[]
    /** True when `sponsors` came from a prior year, not the current one. */
    isFallback: boolean
}

interface MdxData {
    conferenceState: ConferenceState
    ticketSponsors?: MdxSponsorContext
}

// The components below read the route's data from here rather than closing
// over it. A component built from the data would be a new type whenever the
// data changes, and every revalidation hands back new loader data, so React
// would remount the whole MDX tree and drop any state inside it (a
// half-filled form, say). These are defined once, so only their props change.
const MdxDataContext = createContext<MdxData | null>(null)

function useMdxData(): MdxData {
    const data = use(MdxDataContext)
    if (!data) throw new Error('[mdx] MDX components rendered outside useMdxPage')
    return data
}

// Each entry's `.load()` call is memoized because ES module imports are
// singletons — calling it repeatedly returns the same promise.
export function useMdxPage(
    slug: string,
    type: ContentType,
    conferenceState: ConferenceState,
    ticketSponsors?: MdxSponsorContext,
    props?: Record<string, unknown>,
): ReactElement {
    const entry = bundles[type][slug]
    if (!entry) throw new Error(`[mdx] Unknown ${type}: ${slug}`)
    const Page = use(entry.load()).default as ComponentType<Record<string, unknown>>
    return (
        <MdxDataContext value={{ conferenceState, ticketSponsors }}>
            <Page conference={conferenceState.conference} components={mdxComponents} {...props} />
        </MdxDataContext>
    )
}

function TicketSponsorAcknowledgement() {
    // Uses the resolved sponsor context the route loader passes in
    // (via `useMdxPage(..., ticketSponsors)`), so this component
    // doesn't need to know about the fallback resolver itself.
    const { ticketSponsors } = useMdxData()
    if (!ticketSponsors || ticketSponsors.sponsors.length === 0) return null
    const { sponsors, isFallback, currentYear } = ticketSponsors
    return (
        <SponsorAcknowledgement
            prefix={
                isFallback
                    ? `Sponsors keep tickets affordable. Recent supporters include`
                    : 'Tickets stay affordable thanks to'
            }
            sponsors={sponsors}
            cta={isFallback ? { href: '/sponsorship', label: `Sponsor ${currentYear}` } : undefined}
        />
    )
}

function MdxVolunteerForm() {
    return <VolunteerForm conferenceState={useMdxData().conferenceState} />
}

function SubmitSession() {
    const { callForPapers } = useMdxData().conferenceState
    if (callForPapers.state === 'open') {
        if (callForPapers.sessionizeUrl) {
            return (
                <styled.div>
                    <Button asChild>
                        <a href={callForPapers.sessionizeUrl} target="_blank" rel="noopener noreferrer">
                            Submit a session via Sessionize
                            <NewTabHint />
                        </a>
                    </Button>
                </styled.div>
            )
        }
    }
    if (callForPapers.state === 'closed') {
        return <CFPClosed />
    }

    if (callForPapers.state === 'not-open-yet') {
        return <CFPNotOpenYet cfpOpens={conferenceTime(callForPapers.opens)} />
    }
}

function EditSession() {
    const { callForPapers } = useMdxData().conferenceState
    if (callForPapers.state === 'open') {
        return (
            <styled.div>
                <Button asChild>
                    <a href="https://sessionize.com/app/speaker" target="_blank" rel="noopener noreferrer">
                        Submit a session via Sessionize
                        <NewTabHint />
                    </a>
                </Button>
            </styled.div>
        )
    }
    if (callForPapers.state === 'closed') {
        return <CFPClosed />
    }

    if (callForPapers.state === 'not-open-yet') {
        return <CFPNotOpenYet cfpOpens={conferenceTime(callForPapers.opens)} />
    }
}

function VolunteersNeeded({ children }: { children?: ReactNode }) {
    return useMdxData().conferenceState.volunteering.needsVolunteers ? children : null
}

function TicketWaitListOpen({ children }: { children?: ReactNode }) {
    return useMdxData().conferenceState.ticketSales.state === 'wait-list-open' ? children : null
}

function TicketSalesOpen({ children }: { children?: ReactNode }) {
    return useMdxData().conferenceState.ticketSales.state === 'open' ? children : null
}

function BuyTicketForm() {
    const { ticketSales } = useMdxData().conferenceState
    return ticketSales.state === 'open' ? <TicketForm state={ticketSales} /> : null
}

function ConferenceDay({ children }: { children?: ReactNode }) {
    return useMdxData().conferenceState.conferenceState === 'conference-day' ? children : null
}

function OutsideConferenceDay({ children }: { children?: ReactNode }) {
    return useMdxData().conferenceState.conferenceState !== 'conference-day' ? children : null
}

const mdxComponents: MDXComponents = {
    // MDX emits `href`; AppLink takes `to` and decides internal vs
    // external vs mailto from its shape. An <a> with no href in MDX is a
    // content bug, but render it inert rather than crashing the page.
    a: ({ ref, href, ...props }) => (href ? <AppLink unstyled to={href} {...props} /> : <styled.a {...props} />),
    h1: ({ ref, ...props }) => <styled.h1 fontSize="3xl" {...props} />,
    h2: ({ ref, ...props }) => <styled.h2 fontSize="2xl" {...props} />,
    h3: ({ ref, ...props }) => <styled.h3 fontSize="xl" {...props} />,
    ul: ({ ref, ...props }) => <styled.ul {...props} listStyle="inside" />,
    // A long code line scrolls inside the content column rather than
    // widening the page, so keyboard users need focus to scroll it.
    pre: ({ ref, ...props }) => <styled.pre tabIndex={0} {...props} />,
    img: MdxImage,
    Image: MdxImage,
    Hero,
    Stats,
    Stat,
    CardGrid,
    Card,
    Bullet,
    CTA,
    Section,
    SponsorQuotes,
    PastSponsorsGrid,
    TicketSponsorAcknowledgement,
    VolunteerForm: MdxVolunteerForm,
    SubmitSession,
    EditSession,
    VolunteersNeeded,
    TicketWaitListOpen,
    TicketSalesOpen,
    BuyTicketForm,
    ConferenceDay,
    OutsideConferenceDay,
}

export function CFPNotOpenYet({ cfpOpens }: { cfpOpens: Temporal.ZonedDateTime }) {
    return (
        <styled.div>
            <Button disabled>
                Call for Papers not open yet, it opens on{' '}
                {cfpOpens.toLocaleString('en-AU', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                })}
            </Button>
        </styled.div>
    )
}

export function CFPClosed() {
    return (
        <styled.div>
            <Button disabled>Call for Papers is closed</Button>
        </styled.div>
    )
}
