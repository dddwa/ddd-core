import { expect, test as base } from '@playwright/test'

export { expect }

/**
 * Every e2e test fails if the browser logs an error or warning, or throws.
 * React reports hydration mismatches, missing keys and bad props only there
 * (the suite runs the dev server, so they're on), and none of them break a
 * page enough for a screenshot or an assertion to notice.
 *
 * A test that expects one adds a pattern with `test.use({ allowedBrowserErrors: [...] })`.
 * Keep the patterns narrow, so they can't hide a different message.
 */
export const test = base.extend<{ allowedBrowserErrors: RegExp[]; browserErrors: void }>({
    allowedBrowserErrors: [[], { option: true }],
    browserErrors: [
        async ({ page, allowedBrowserErrors }, use) => {
            const errors: string[] = []
            const allowed = (text: string) => allowedBrowserErrors.some((pattern) => pattern.test(text))
            page.on('console', (message) => {
                const type = message.type()
                if ((type === 'error' || type === 'warning') && !allowed(message.text())) {
                    errors.push(`console.${type}: ${message.text()}`)
                }
            })
            page.on('pageerror', (error) => {
                if (!allowed(error.message)) errors.push(`uncaught: ${error.message}`)
            })
            await use()
            expect(errors, 'the browser logged errors or warnings').toEqual([])
        },
        { auto: true },
    ],
})
