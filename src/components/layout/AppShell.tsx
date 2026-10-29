import {useCallback, useEffect, useState} from 'react'
import {Outlet} from 'react-router-dom'
import {CensusBar} from './CensusBar'
import {Sidebar} from './Sidebar'
import {Topbar} from './Topbar'

export function AppShell() {
    const [collapsed, setCollapsed] = useState(() => {
        try {
            return localStorage.getItem('rounds-sidebar') === 'collapsed'
        } catch {
            return false
        }
    })
    const [mobileOpen, setMobileOpen] = useState(false)
    const closeMobile = useCallback(() => setMobileOpen(false), [])

    useEffect(() => {
        try {
            localStorage.setItem('rounds-sidebar', collapsed ? 'collapsed' : 'open')
        } catch { /* storage unavailable */
        }
    }, [collapsed])

    return (
        <div className="flex min-h-screen">
            <a
                href="#main"
                className="absolute -top-20 left-3 z-[2000] rounded bg-ink px-3.5 py-2.5 font-semibold text-surface focus:top-3 focus:no-underline"
            >
                Skip to main content
            </a>

            <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onCloseMobile={closeMobile}/>

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)}
                        onOpenMobile={() => setMobileOpen(true)}/>
                <CensusBar/>
                <main id="main" tabIndex={-1}
                      className="flex-1 px-4 pb-7 pt-4 outline-none sm:px-5 sm:pt-5 lg:px-7 lg:pb-9 lg:pt-6">
                    <Outlet/>
                </main>
                <footer
                    className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-line bg-surface px-4 py-3.5 text-[12.5px] text-muted sm:px-5 lg:px-7 lg:py-4">
                    <p>© St. Aldric General Hospital · Rounds HMS 2.4 · All names and records are fictional demo
                        data.</p>
                    <p>Template by <a href="https://uicookies.com/">uiCookies</a></p>
                </footer>
            </div>
        </div>
    )
}