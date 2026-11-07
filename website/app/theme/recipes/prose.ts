import { defineRecipe } from '@pandacss/dev'

// Long-form content styles for MDX pages and blog posts: `prose({ size: 'lg' })`.
//
// Generated once from @tailwindcss/typography 0.5 (via pandacss-preset-typography),
// then owned here so it can be edited directly and doesn't pull Tailwind into the
// build. Colours come from the `colors.prose.*` semantic tokens in panda.config.ts.
// Only the sizes in use are kept; Tailwind's typography plugin has sm, xl and 2xl
// on the same scale if one is needed.
export const prose = defineRecipe({
    className: 'prose',
    base: {
        color: 'prose.body',
        maxWidth: '65ch',
        '& [class~="lead"]': {
            color: 'prose.lead',
        },
        '& a': {
            color: 'prose.link',
            textDecoration: 'underline',
            fontWeight: '500',
        },
        '& strong': {
            color: 'prose.bold',
            fontWeight: '600',
        },
        '& a strong': {
            color: 'inherit',
        },
        '& blockquote strong': {
            color: 'inherit',
        },
        '& thead th strong': {
            color: 'inherit',
        },
        '& ol': {
            listStyleType: 'decimal',
        },
        '& ol[type="A"]': {
            listStyleType: 'upper-alpha',
        },
        '& ol[type="a"]': {
            listStyleType: 'lower-alpha',
        },
        '& ol[type="A" s]': {
            listStyleType: 'upper-alpha',
        },
        '& ol[type="a" s]': {
            listStyleType: 'lower-alpha',
        },
        '& ol[type="I"]': {
            listStyleType: 'upper-roman',
        },
        '& ol[type="i"]': {
            listStyleType: 'lower-roman',
        },
        '& ol[type="I" s]': {
            listStyleType: 'upper-roman',
        },
        '& ol[type="i" s]': {
            listStyleType: 'lower-roman',
        },
        '& ol[type="1"]': {
            listStyleType: 'decimal',
        },
        '& ul': {
            listStyleType: 'disc',
        },
        '& ol > li::marker': {
            fontWeight: '400',
            color: 'prose.counter',
        },
        '& ul > li::marker': {
            color: 'prose.bullet',
        },
        '& dt': {
            color: 'prose.heading',
            fontWeight: '600',
        },
        '& hr': {
            borderColor: 'prose.hrBorder',
            borderTopWidth: '1px',
        },
        '& blockquote': {
            fontWeight: '500',
            fontStyle: 'italic',
            color: 'prose.quote',
            borderInlineStartWidth: '0.25rem',
            borderInlineStartColor: 'prose.quoteBorder',
            quotes: '"\\201C""\\201D""\\2018""\\2019"',
        },
        '& blockquote p:first-of-type::before': {
            content: 'open-quote',
        },
        '& blockquote p:last-of-type::after': {
            content: 'close-quote',
        },
        '& h1': {
            color: 'prose.heading',
            fontWeight: '800',
        },
        '& h1 strong': {
            fontWeight: '900',
            color: 'inherit',
        },
        '& h2': {
            color: 'prose.heading',
            fontWeight: '700',
        },
        '& h2 strong': {
            fontWeight: '800',
            color: 'inherit',
        },
        '& h3': {
            color: 'prose.heading',
            fontWeight: '600',
        },
        '& h3 strong': {
            fontWeight: '700',
            color: 'inherit',
        },
        '& h4': {
            color: 'prose.heading',
            fontWeight: '600',
        },
        '& h4 strong': {
            fontWeight: '700',
            color: 'inherit',
        },
        '& picture': {
            display: 'block',
        },
        '& kbd': {
            fontWeight: '500',
            fontFamily: 'inherit',
            color: 'prose.kbd',
            boxShadow: '0 0 0 1px var(--colors-prose-kbd-shadow), 0 3px 0 var(--colors-prose-kbd-shadow)',
        },
        '& code': {
            color: 'prose.code',
            fontWeight: '600',
        },
        '& code::before': {
            content: '"`"',
        },
        '& code::after': {
            content: '"`"',
        },
        '& a code': {
            color: 'inherit',
        },
        '& h1 code': {
            color: 'inherit',
        },
        '& h2 code': {
            color: 'inherit',
        },
        '& h3 code': {
            color: 'inherit',
        },
        '& h4 code': {
            color: 'inherit',
        },
        '& blockquote code': {
            color: 'inherit',
        },
        '& thead th code': {
            color: 'inherit',
        },
        '& pre': {
            color: 'prose.preCode',
            backgroundColor: 'prose.preBg',
            overflowX: 'auto',
            fontWeight: '400',
        },
        '& pre code': {
            backgroundColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '0px',
            padding: '0px',
            fontWeight: 'inherit',
            color: 'inherit',
            fontSize: 'inherit',
            fontFamily: 'inherit',
            lineHeight: 'inherit',
        },
        '& pre code::before': {
            content: 'none',
        },
        '& pre code::after': {
            content: 'none',
        },
        '& table': {
            width: '100%',
            tableLayout: 'auto',
            marginTop: '2em',
            marginBottom: '2em',
        },
        '& thead': {
            borderBottomWidth: '1px',
            borderBottomColor: 'prose.thBorder',
        },
        '& thead th': {
            color: 'prose.heading',
            fontWeight: '600',
            verticalAlign: 'bottom',
        },
        '& tbody tr': {
            borderBottomWidth: '1px',
            borderBottomColor: 'prose.tdBorder',
        },
        '& tbody tr:last-child': {
            borderBottomWidth: '0px',
        },
        '& tbody td': {
            verticalAlign: 'baseline',
        },
        '& tfoot': {
            borderTopWidth: '1px',
            borderTopColor: 'prose.thBorder',
        },
        '& tfoot td': {
            verticalAlign: 'top',
        },
        '& th, & td': {
            textAlign: 'start',
        },
        '& figcaption': {
            color: 'prose.caption',
        },
        '& > :first-child': {
            marginTop: '0px',
        },
        '& > :last-child': {
            marginBottom: '0px',
        },
    },
    defaultVariants: {
        size: 'base',
    },
    variants: {
        size: {
            base: {
                fontSize: '1rem',
                lineHeight: '1.75',
                '& p': {
                    marginTop: '1.25em',
                    marginBottom: '1.25em',
                },
                '& [class~="lead"]': {
                    fontSize: '1.25em',
                    lineHeight: '1.6',
                    marginTop: '1.2em',
                    marginBottom: '1.2em',
                },
                '& blockquote': {
                    marginTop: '1.6em',
                    marginBottom: '1.6em',
                    paddingInlineStart: '1em',
                },
                '& h1': {
                    fontSize: '2.25em',
                    marginTop: '0px',
                    marginBottom: '0.8888889em',
                    lineHeight: '1.1111111',
                },
                '& h2': {
                    fontSize: '1.5em',
                    marginTop: '2em',
                    marginBottom: '1em',
                    lineHeight: '1.3333333',
                },
                '& h3': {
                    fontSize: '1.25em',
                    marginTop: '1.6em',
                    marginBottom: '0.6em',
                    lineHeight: '1.6',
                },
                '& h4': {
                    marginTop: '1.5em',
                    marginBottom: '0.5em',
                    lineHeight: '1.5',
                },
                '& img': {
                    marginTop: '2em',
                    marginBottom: '2em',
                },
                '& picture': {
                    marginTop: '2em',
                    marginBottom: '2em',
                },
                '& picture > img': {
                    marginTop: '0px',
                    marginBottom: '0px',
                },
                '& video': {
                    marginTop: '2em',
                    marginBottom: '2em',
                },
                '& kbd': {
                    fontSize: '0.875em',
                    borderRadius: '0.3125rem',
                    paddingTop: '0.1875em',
                    paddingInlineEnd: '0.375em',
                    paddingBottom: '0.1875em',
                    paddingInlineStart: '0.375em',
                },
                '& code': {
                    fontSize: '0.875em',
                },
                '& h2 code': {
                    fontSize: '0.875em',
                },
                '& h3 code': {
                    fontSize: '0.9em',
                },
                '& pre': {
                    fontSize: '0.875em',
                    lineHeight: '1.7142857',
                    marginTop: '1.7142857em',
                    marginBottom: '1.7142857em',
                    borderRadius: '0.375rem',
                    paddingTop: '0.8571429em',
                    paddingInlineEnd: '1.1428571em',
                    paddingBottom: '0.8571429em',
                    paddingInlineStart: '1.1428571em',
                },
                '& ol': {
                    marginTop: '1.25em',
                    marginBottom: '1.25em',
                    paddingInlineStart: '1.625em',
                },
                '& ul': {
                    marginTop: '1.25em',
                    marginBottom: '1.25em',
                    paddingInlineStart: '1.625em',
                },
                '& li': {
                    marginTop: '0.5em',
                    marginBottom: '0.5em',
                },
                '& ol > li': {
                    paddingInlineStart: '0.375em',
                },
                '& ul > li': {
                    paddingInlineStart: '0.375em',
                },
                '& > ul > li p': {
                    marginTop: '0.75em',
                    marginBottom: '0.75em',
                },
                '& > ul > li > p:first-child': {
                    marginTop: '1.25em',
                },
                '& > ul > li > p:last-child': {
                    marginBottom: '1.25em',
                },
                '& > ol > li > p:first-child': {
                    marginTop: '1.25em',
                },
                '& > ol > li > p:last-child': {
                    marginBottom: '1.25em',
                },
                '& ul ul, & ul ol, & ol ul, & ol ol': {
                    marginTop: '0.75em',
                    marginBottom: '0.75em',
                },
                '& dl': {
                    marginTop: '1.25em',
                    marginBottom: '1.25em',
                },
                '& dt': {
                    marginTop: '1.25em',
                },
                '& dd': {
                    marginTop: '0.5em',
                    paddingInlineStart: '1.625em',
                },
                '& hr': {
                    marginTop: '3em',
                    marginBottom: '3em',
                },
                '& hr + *': {
                    marginTop: '0px',
                },
                '& h2 + *': {
                    marginTop: '0px',
                },
                '& h3 + *': {
                    marginTop: '0px',
                },
                '& h4 + *': {
                    marginTop: '0px',
                },
                '& table': {
                    fontSize: '0.875em',
                    lineHeight: '1.7142857',
                },
                '& thead th': {
                    paddingInlineEnd: '0.5714286em',
                    paddingBottom: '0.5714286em',
                    paddingInlineStart: '0.5714286em',
                },
                '& thead th:first-child': {
                    paddingInlineStart: '0px',
                },
                '& thead th:last-child': {
                    paddingInlineEnd: '0px',
                },
                '& tbody td, & tfoot td': {
                    paddingTop: '0.5714286em',
                    paddingInlineEnd: '0.5714286em',
                    paddingBottom: '0.5714286em',
                    paddingInlineStart: '0.5714286em',
                },
                '& tbody td:first-child, & tfoot td:first-child': {
                    paddingInlineStart: '0px',
                },
                '& tbody td:last-child, & tfoot td:last-child': {
                    paddingInlineEnd: '0px',
                },
                '& figure': {
                    marginTop: '2em',
                    marginBottom: '2em',
                },
                '& figure > *': {
                    marginTop: '0px',
                    marginBottom: '0px',
                },
                '& figcaption': {
                    fontSize: '0.875em',
                    lineHeight: '1.4285714',
                    marginTop: '0.8571429em',
                },
            },
            lg: {
                fontSize: '1.125rem',
                lineHeight: '1.7777778',
                '& p': {
                    marginTop: '1.3333333em',
                    marginBottom: '1.3333333em',
                },
                '& [class~="lead"]': {
                    fontSize: '1.2222222em',
                    lineHeight: '1.4545455',
                    marginTop: '1.0909091em',
                    marginBottom: '1.0909091em',
                },
                '& blockquote': {
                    marginTop: '1.6666667em',
                    marginBottom: '1.6666667em',
                    paddingInlineStart: '1em',
                },
                '& h1': {
                    fontSize: '2.6666667em',
                    marginTop: '0px',
                    marginBottom: '0.8333333em',
                    lineHeight: '1',
                },
                '& h2': {
                    fontSize: '1.6666667em',
                    marginTop: '1.8666667em',
                    marginBottom: '1.0666667em',
                    lineHeight: '1.3333333',
                },
                '& h3': {
                    fontSize: '1.3333333em',
                    marginTop: '1.6666667em',
                    marginBottom: '0.6666667em',
                    lineHeight: '1.5',
                },
                '& h4': {
                    marginTop: '1.7777778em',
                    marginBottom: '0.4444444em',
                    lineHeight: '1.5555556',
                },
                '& img': {
                    marginTop: '1.7777778em',
                    marginBottom: '1.7777778em',
                },
                '& picture': {
                    marginTop: '1.7777778em',
                    marginBottom: '1.7777778em',
                },
                '& picture > img': {
                    marginTop: '0px',
                    marginBottom: '0px',
                },
                '& video': {
                    marginTop: '1.7777778em',
                    marginBottom: '1.7777778em',
                },
                '& kbd': {
                    fontSize: '0.8888889em',
                    borderRadius: '0.3125rem',
                    paddingTop: '0.2222222em',
                    paddingInlineEnd: '0.4444444em',
                    paddingBottom: '0.2222222em',
                    paddingInlineStart: '0.4444444em',
                },
                '& code': {
                    fontSize: '0.8888889em',
                },
                '& h2 code': {
                    fontSize: '0.8666667em',
                },
                '& h3 code': {
                    fontSize: '0.875em',
                },
                '& pre': {
                    fontSize: '0.8888889em',
                    lineHeight: '1.75',
                    marginTop: '2em',
                    marginBottom: '2em',
                    borderRadius: '0.375rem',
                    paddingTop: '1em',
                    paddingInlineEnd: '1.5em',
                    paddingBottom: '1em',
                    paddingInlineStart: '1.5em',
                },
                '& ol': {
                    marginTop: '1.3333333em',
                    marginBottom: '1.3333333em',
                    paddingInlineStart: '1.5555556em',
                },
                '& ul': {
                    marginTop: '1.3333333em',
                    marginBottom: '1.3333333em',
                    paddingInlineStart: '1.5555556em',
                },
                '& li': {
                    marginTop: '0.6666667em',
                    marginBottom: '0.6666667em',
                },
                '& ol > li': {
                    paddingInlineStart: '0.4444444em',
                },
                '& ul > li': {
                    paddingInlineStart: '0.4444444em',
                },
                '& > ul > li p': {
                    marginTop: '0.8888889em',
                    marginBottom: '0.8888889em',
                },
                '& > ul > li > p:first-child': {
                    marginTop: '1.3333333em',
                },
                '& > ul > li > p:last-child': {
                    marginBottom: '1.3333333em',
                },
                '& > ol > li > p:first-child': {
                    marginTop: '1.3333333em',
                },
                '& > ol > li > p:last-child': {
                    marginBottom: '1.3333333em',
                },
                '& ul ul, & ul ol, & ol ul, & ol ol': {
                    marginTop: '0.8888889em',
                    marginBottom: '0.8888889em',
                },
                '& dl': {
                    marginTop: '1.3333333em',
                    marginBottom: '1.3333333em',
                },
                '& dt': {
                    marginTop: '1.3333333em',
                },
                '& dd': {
                    marginTop: '0.6666667em',
                    paddingInlineStart: '1.5555556em',
                },
                '& hr': {
                    marginTop: '3.1111111em',
                    marginBottom: '3.1111111em',
                },
                '& hr + *': {
                    marginTop: '0px',
                },
                '& h2 + *': {
                    marginTop: '0px',
                },
                '& h3 + *': {
                    marginTop: '0px',
                },
                '& h4 + *': {
                    marginTop: '0px',
                },
                '& table': {
                    fontSize: '0.8888889em',
                    lineHeight: '1.5',
                },
                '& thead th': {
                    paddingInlineEnd: '0.75em',
                    paddingBottom: '0.75em',
                    paddingInlineStart: '0.75em',
                },
                '& thead th:first-child': {
                    paddingInlineStart: '0px',
                },
                '& thead th:last-child': {
                    paddingInlineEnd: '0px',
                },
                '& tbody td, & tfoot td': {
                    paddingTop: '0.75em',
                    paddingInlineEnd: '0.75em',
                    paddingBottom: '0.75em',
                    paddingInlineStart: '0.75em',
                },
                '& tbody td:first-child, & tfoot td:first-child': {
                    paddingInlineStart: '0px',
                },
                '& tbody td:last-child, & tfoot td:last-child': {
                    paddingInlineEnd: '0px',
                },
                '& figure': {
                    marginTop: '1.7777778em',
                    marginBottom: '1.7777778em',
                },
                '& figure > *': {
                    marginTop: '0px',
                    marginBottom: '0px',
                },
                '& figcaption': {
                    fontSize: '0.8888889em',
                    lineHeight: '1.5',
                    marginTop: '1em',
                },
            },
        },
    },
})
