import { Suspense } from 'react'
import { microcms } from '@/lib/microcms'
import { BlogType } from '@/types'
import Top from '@/components/top/Top'
import TopList from '@/components/top/TopList'
import LayoutWithSidebar from '@/components/layout/LayoutWithSidebar'
import Loading from '@/app/loading'

export const revalidate = 0

// メインページ
const HomePage = async () => {
    // 非同期で複数のデータを同時に取得
    const [latestBlogs, recommendedBlogs, specialBlogs, techBlogs, designBlogs, dailyLogs] = await Promise.all([
        // 最新のブログ記事を取得
        microcms.getList<BlogType>({
            endpoint: 'blog',
            queries: {
                orders: '-publishedAt',
                limit: 10,
            },
        }),

        // オススメ記事を取得
        microcms.getList<BlogType>({
            endpoint: 'blog',
            queries: {
                filters: 'isRecommended[equals]true',
            },
        }),

        // 特集記事を取得
        microcms.getList<BlogType>({
            endpoint: 'blog',
            queries: {
                filters: 'isSpecial[equals]true',
            },
        }),
        // テクノロジー関連の記事を取得
        microcms.getList<BlogType>({
            endpoint: 'blog',
            queries: {
                filters: 'isTech[equals]true',
            },
        }),

        // デザイン関連の記事を取得
        microcms.getList<BlogType>({
            endpoint: 'blog',
            queries: {
                filters: 'isDesign[equals]true',
            },
        }),

        // デイリーログを取得
        microcms.getList<BlogType>({
            endpoint: 'blog',
            queries: {
                filters: 'isDailylog[equals]true',
            },
        }),
    ])

    return (
        <Suspense fallback={<Loading />}>
            <div className="space-y-10 mb-10">
                <Top blogs={recommendedBlogs.contents} />

                <LayoutWithSidebar>
                    <TopList
                        latestBlogs={latestBlogs.contents}
                        recommendedBlogs={recommendedBlogs.contents}
                        specialBlogs={specialBlogs.contents}
                        techBlogs={techBlogs.contents} // 追加
                        designBlogs={designBlogs.contents} // 追加
                        dailylogs={dailyLogs.contents} // 追加
                    />
                </LayoutWithSidebar>
            </div>
        </Suspense>
    )
}

export default HomePage
