interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
       <div>
            <header className="bg-primary-100 relative z-30 border-b flex items-center p-5">
                <a className="text-lg font-semibold">
                    Feint
                </a>
                <div className="mx-auto">
                    <input placeholder="Search for a summoner..." className="p-0.5 pl-4 w-96" />
                </div>
            </header>
            <main>
                {children}
            </main>
            <footer className="bg-primary-100 p-5 border-t">
                <div className="text-center">
                    Feint.gg © {new Date().getFullYear()}
                </div>
            </footer>
       </div>
    )
}