'use client'

import Image from 'next/image'
import Link from 'next/link'

// サイドバー
const Sidebar = () => {
    return (
        <div className="space-y-10">
            <div className="border flex flex-col items-center justify-center p-5 space-y-5">
                <Link href="/about">
                    <Image
                        src="/default.png"
                        width={120}
                        height={120}
                        alt="avatar"
                        className="rounded-full"
                        priority={false}
                    />
                </Link>

                <div className="font-bold text-xl">SG</div>

                <div className="text-sm">
                    Canadaでエンジニアを目指しています！
                    <br />
                    カナダ生活や技術ブログなどを発信しています。
                </div>
            </div>
        </div>
    )
}

export default Sidebar
