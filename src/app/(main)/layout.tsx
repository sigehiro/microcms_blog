import Navigation from '@/components/navigation/Navigation'

interface MainLayoutProps {
    children: React.ReactNode
}

// メインレイアウト
const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1 mb-4">{children}</main>
            <footer className="border-t py-4 bg-gray-100">
                <div className="flex flex-col items-center justify-center text-sm space-y-5">
                    <div> &copy;SG </div>
                </div>
            </footer>
        </div>
    )
}

export default MainLayout
