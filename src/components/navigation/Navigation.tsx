'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const items = [
  {
    title: 'HOME',
    href: '/',
  },
  {
    title: 'ABOUT',
    href: '/about',
  },
  {
    title: 'RANKING',
    href: '/ranking',
  },
  {
    title: 'BLOG',
    href: '/blog',
  },
]

// ナビゲーション
const Navigation = () => {
  const pathname = usePathname()

  return (
    <header>
      <div className="mx-auto flex max-w-screen-lg items-center justify-between px-2 py-8">
        <Link href="/" className="font-bold text-xl">
          Ukiyo Life Design
        </Link>
        <a
          href="https://online.ukiyo.help/en/products"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded border border-transparent px-2 py-1 text-base font-bold text-gray-600 transition-colors hover:border-teal-600 hover:text-teal-600"
        >
          Atelier
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 3h7v7" />
            <path d="M13 3L3 13" />
          </svg>
        </a>
      </div>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-screen-lg px-2">
          <div className="flex items-center justify-between text-sm font-bold">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  'border-r border-l border-white py-3 text-center w-full hover:bg-black hover:text-white',
                  pathname === item.href && 'bg-black text-white'
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navigation
