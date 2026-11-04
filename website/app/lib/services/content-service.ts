import type { FrontmatterProperties } from '../mdx-types'

export type ContentType = 'blog' | 'page'

export interface ContentPage {
    frontmatter: FrontmatterProperties
    slug: string
    type: ContentType
    dateDisplay: string | undefined
}

export interface ContentListItem {
    title: string
    summary?: string
    linkText: string
    slug: string
    featured: boolean
    date?: string
    dateDisplay?: string
    image?: string
    imageAlt?: string
}

export interface ContentService {
    getPage(slug: string, type: ContentType): Promise<ContentPage | null>
    getPagesList(type: ContentType): Promise<ContentListItem[]>
}
