import {cn} from '@/lib/cn.ts'

const tints = {
    navy: 'bg-[#dfe8f3] text-[#0b2a4a]',
    teal: 'bg-[#d4f1e9] text-[#075e50]',
    coral: 'bg-[#fbe0da] text-[#9e3322]',
    amber: 'bg-[#faebcc] text-[#734a00]',
    sky: 'bg-[#dbe9f9] text-[#1c5390]',
    slate: 'bg-[#e3e8ee] text-[#3a4c60]',
}

export type AvatarTint = keyof typeof tints

const sizes = {
    sm: 'size-[30px] rounded-md text-[11px]',
    md: 'size-[34px] rounded-[7px] text-xs',
    xl: 'size-[72px] rounded-[14px] text-2xl tracking-[.02em] max-md:size-14 max-md:text-[19px]',
}

type Props = {
    initials: string
    tint?: keyof typeof tints
    size?: keyof typeof sizes
    className?: string
}

export function Avatar({initials, tint = 'navy', size = 'md', className}: Props) {
    return (
        <span
            aria-hidden="true"
            className={cn('inline-grid flex-none place-items-center font-semibold leading-none tracking-[.04em]', tints[tint], sizes[size], className)}
        >
      {initials}
    </span>
    )
}