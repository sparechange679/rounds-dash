import type {ReactNode} from 'react'
import {useId} from 'react'
import {cn} from '@/lib/cn.ts'

type Option<T extends string> = { value: T; label: ReactNode }

type Props<T extends string> = {
    options: Option<T>[]
    value: T
    onChange: (value: T) => void
    label: string                // accessible group name
    mode?: 'buttons' | 'radio'   // buttons: aria-pressed toggles; radio: native radios (forms)
    block?: boolean
    className?: string
}

const wrap = 'inline-flex max-w-full gap-0.5 rounded-[7px] border border-line bg-surface-3 p-[3px]'
const seg = 'cursor-pointer whitespace-nowrap rounded-[5px] px-[11px] py-[5px] text-[12.5px] font-medium leading-snug text-muted transition-colors hover:text-ink'
const on = 'bg-surface text-ink shadow-[0_1px_2px_rgb(12_31_51/.12),0_0_0_1px_var(--color-line)]'

export function Segmented<T extends string>({options, value, onChange, label, mode = 'buttons', block, className}: Props<T>) {
    const name = useId()

    if (mode === 'radio') {
        return (
            <div role="radiogroup" aria-label={label} className={cn(wrap, block && 'flex w-full', className)}>
                {options.map((o) => (
                    <label key={o.value} className={cn(seg, block && 'flex-1 px-2 py-[7px] text-center', 'has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-focus', value === o.value && on)}>
                        <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="sr-only"/>
                        {o.label}
                    </label>
                ))}
            </div>
        )
    }

    return (
        <div role="group" aria-label={label} className={cn(wrap, block && 'flex w-full', className)}>
            {options.map((o) => (
                <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}
                        className={cn(seg, block && 'flex-1', value === o.value && on)}>
                    {o.label}
                </button>
            ))}
        </div>
    )
}