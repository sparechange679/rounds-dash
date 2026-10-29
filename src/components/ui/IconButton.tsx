import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { dark?: boolean }

export function IconButton({ dark, className, type = 'button', ...rest }: Props) {
    return (
        <button
            type={type}
            className={cn(
                'relative inline-flex size-[38px] flex-none items-center justify-center rounded transition-colors',
                dark ? 'text-[#cfe0f0] hover:bg-white/8 hover:text-white' : 'text-text hover:bg-surface-3 hover:text-ink',
                className,
            )}
            {...rest}
        />
    )
}