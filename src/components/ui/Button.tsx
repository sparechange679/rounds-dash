import type {ButtonHTMLAttributes, ReactNode} from 'react'
import {Link, type LinkProps} from 'react-router-dom'
import {cn} from '@/lib/cn.ts'

const variants = {
    primary: 'border-primary bg-primary text-on-primary hover:border-primary-hover hover:bg-primary-hover',
    outline: 'border-line-2 bg-surface text-ink hover:border-muted-2 hover:bg-surface-3',
    ghost: 'border-transparent bg-transparent text-muted hover:bg-surface-3 hover:text-ink',
}
const sizes = {
    xs: 'gap-1.5 rounded-[5px] px-2 py-[3px] text-xs',
    sm: 'gap-[7px] rounded-md px-2.5 py-[5px] text-[13px]',
    md: 'gap-[7px] rounded-md px-3.5 py-2 text-sm',
    lg: 'gap-2 rounded-lg px-4 py-3 text-base',
}

type Style = { variant?: keyof typeof variants; size?: keyof typeof sizes; block?: boolean; className?: string }

function buttonClass({variant = 'primary', size = 'md', block, className}: Style = {}) {
    return cn(
        'inline-flex items-center justify-center whitespace-nowrap border font-medium transition-colors',
        'hover:no-underline disabled:pointer-events-none disabled:opacity-60 [&>.ic]:size-4',
        variants[variant], sizes[size], block && 'w-full', className,
    )
}

type Props = Style & ButtonHTMLAttributes<HTMLButtonElement> & { children?: ReactNode }

export function Button({variant, size, block, className, type = 'button', ...rest}: Props) {
    return <button type={type} className={buttonClass({variant, size, block, className})} {...rest} />
}

/** A router link that looks like a button. */
export function ButtonLink({variant, size, block, className, ...rest}: Style & LinkProps) {
    return <Link className={buttonClass({variant, size, block, className})} {...rest} />
}