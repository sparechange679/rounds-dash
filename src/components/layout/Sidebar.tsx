import {useEffect} from 'react'
import {Link, NavLink, useLocation} from 'react-router-dom'
import {Icon} from '../icons/Icon.tsx'
import {Avatar} from '../ui/Avatar.tsx'
import {IconButton} from '../ui/IconButton.tsx'
import {cn} from '../../lib/cn'
import {BrandMark} from './BrandMark'
import {navGroups} from './nav'

type Props = { collapsed: boolean; mobileOpen: boolean; onCloseMobile: () => void }

export function Sidebar({collapsed, mobileOpen, onCloseMobile}: Props) {
    const {pathname} = useLocation()

    // Close the drawer after navigating.
    useEffect(() => {
        onCloseMobile()
    }, [pathname, onCloseMobile])

    return (
        <>
            {mobileOpen && (
                <div className="fixed inset-0 z-[1040] bg-[#04101d]/55 lg:hidden" onClick={onCloseMobile}
                     aria-hidden="true"/>
            )}

            <aside
                id="sidebar"
                data-collapsed={collapsed}
                aria-label="Sidebar"
                className={cn(
                    'fixed inset-y-0 left-0 z-[1045] w-[284px] -translate-x-full text-[#a9bdd2] transition-transform duration-300',
                    'lg:relative lg:z-[1030] lg:w-[252px] lg:flex-none lg:translate-x-0 lg:transition-[width] lg:duration-200',
                    'lg:data-[collapsed=true]:w-[72px]',
                    mobileOpen && 'translate-x-0',
                )}
            >
                <div
                    className="flex h-full flex-col overflow-y-auto overflow-x-hidden bg-sidebar bg-[radial-gradient(120%_60%_at_0%_0%,rgba(94,224,193,.08),transparent_60%)] lg:sticky lg:top-0 lg:h-screen">
                    {/* Brand */}
                    <div
                        className="flex h-[60px] flex-none items-center justify-between gap-2 border-b border-white/8 pl-[18px] pr-3 rail:justify-center rail:px-0">
                        <Link to="/"
                              className="inline-flex min-w-0 items-center gap-[11px] text-white hover:no-underline">
                            <BrandMark/>
                            <span className="flex min-w-0 flex-col leading-[1.1] rail:hidden">
                                <span className="text-[17px] font-bold tracking-[-.01em] text-white">Rounds</span>
                                <span
                                    className="mt-0.5 whitespace-nowrap font-mono text-[10.5px] tracking-[.04em] text-[#8fa9c4]">St. Aldric General</span>
                            </span>
                        </Link>
                        <IconButton dark className="lg:hidden" aria-label="Close navigation" onClick={onCloseMobile}>
                            <Icon name="close"/>
                        </IconButton>
                    </div>

                    {/* Nav */}
                    <nav aria-label="Primary" className="flex-1 px-3 pb-4 pt-1.5">
                        {navGroups.map((group) => (
                            <div key={group.label}>
                                <p className="mx-2.5 mb-2 mt-[18px] font-mono text-[10px] font-semibold uppercase leading-none tracking-[.14em] text-[#6f8cab] rail:hidden">
                                    {group.label}
                                </p>
                                <hr className="mx-2 my-3.5 hidden border-white/10 rail:block"/>
                                <ul className="grid gap-0.5">
                                    {group.items.map((item) => (
                                        <li key={item.to}>
                                            <NavLink
                                                to={item.to}
                                                end={item.to === '/'}
                                                title={item.label}
                                                className={({isActive}) =>
                                                    cn(
                                                        'group/link relative flex items-center gap-3 rounded px-2.5 py-[9px] text-sm font-medium text-[#a9bdd2] transition-colors hover:bg-white/6 hover:text-white hover:no-underline rail:justify-center rail:px-0 rail:py-[11px]',
                                                        isActive && 'bg-mint/12 text-white before:absolute before:-left-3 before:bottom-2 before:top-2 before:w-[3px] before:rounded-r-[3px] before:bg-mint',
                                                    )
                                                }
                                            >
                                                {({isActive}) => (
                                                    <>
                                                        <Icon name={item.icon}
                                                              className={cn('size-[19px]', isActive ? 'text-mint' : 'text-[#7f9bb8] group-hover/link:text-[#cfe0f0]')}/>
                                                        <span
                                                            className="truncate whitespace-nowrap rail:hidden">{item.label}</span>
                                                        {item.count && (
                                                            <span
                                                                className={cn('ml-auto whitespace-nowrap rounded-[4px] px-1.5 py-1 font-mono text-[11px] font-medium leading-none rail:hidden', isActive ? 'bg-mint/18 text-mint' : 'bg-white/8 text-[#cddbea]')}>
                                                                {item.count}
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>

                    {/* Footer: shift card + sign out */}
                    <div className="grid flex-none gap-1.5 border-t border-white/8 p-3">
                        <div
                            className="flex items-center gap-2.5 rounded-lg border border-white/8 bg-white/5 p-2.5 rail:justify-center rail:border-transparent rail:bg-transparent rail:px-0 rail:py-1.5">
                            <Avatar initials="AO" tint="sky"/>
                            <div className="flex min-w-0 flex-1 flex-col gap-px text-xs text-[#a9bdd2] rail:hidden">
                                <strong className="truncate text-[13px] font-semibold text-white">Dr. Adaeze
                                    Okafor</strong>
                                <span>Day shift · 07:00–19:00</span>
                                <span className="mt-[7px] h-1 overflow-hidden rounded bg-white/12" role="img"
                                      aria-label="Shift 23 percent complete">
                                    <span className="block h-full w-[23%] rounded bg-mint"/>
                                </span>
                            </div>
                        </div>
                        <Link
                            to="/login"
                            title="Sign out"
                            className="flex items-center gap-3 rounded px-2.5 py-[9px] text-[13px] font-medium text-[#8fa9c4] transition-colors hover:bg-white/6 hover:text-white hover:no-underline rail:justify-center rail:px-0"
                        >
                            <Icon name="logout" className="size-[19px] text-[#7f9bb8]"/>
                            <span className="rail:hidden">Sign out</span>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    )
}