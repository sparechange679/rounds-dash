import type {ReactNode} from 'react'
import {Link} from 'react-router-dom'

type Props = { crumb: string; title: string; subtitle?: string; actions?: ReactNode }

export function PageHeader({crumb, title, subtitle, actions}: Props) {
    return (
        <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3.5">
            <div className="min-w-0">
                <nav aria-label="Breadcrumb">
                    <ol className="mb-1.5 flex flex-wrap gap-1.5 font-mono text-[11px] font-medium uppercase leading-snug tracking-[.07em] text-muted">
                        <li>
                            <Link to="/" className="text-muted hover:text-ink">St. Aldric General</Link>
                        </li>
                        <li aria-current="page"
                            className="text-ink before:mr-1.5 before:text-line-2 before:content-['/']">
                            {crumb}
                        </li>
                    </ol>
                </nav>
                <h1 className="text-[22px] font-semibold leading-tight tracking-[-.015em] md:text-[26px]">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
            </div>
            {actions && <div className="flex flex-wrap gap-2 max-sm:w-full">{actions}</div>}
        </div>
    )
}