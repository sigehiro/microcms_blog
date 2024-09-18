import { Suspense } from 'react'
import { microcms } from '@/lib/microcms'
import { AboutType } from '@/types'
import About from '@/components/about/About'
import LayoutWithSidebar from '@/components/layout/LayoutWithSidebar'
import Loading from '@/app/loading'

export const revalidate = 0

// アバウトページ
const AboutPage = async () => {
    const about = await microcms.getList<AboutType>({
        endpoint: 'about',
        queries: {
            orders: '-publishedAt', //-をつけると降順になる
            limit: 1,
        },
    })

    return (
        <Suspense fallback={<Loading />}>
            <LayoutWithSidebar>
                <About content={about.contents[0].content} />
            </LayoutWithSidebar>
        </Suspense>
    )
}

export default AboutPage
