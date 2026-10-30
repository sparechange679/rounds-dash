import type {ComponentProps, ReactNode} from 'react'
import {cn} from '@/lib/cn.ts'

const control =
    'w-full rounded-md border border-line-2 bg-surface px-3 text-sm text-ink placeholder:text-muted-2 ' +
    'focus:border-focus focus:outline-none focus:ring-[3px] focus:ring-focus/25 ' +
    'aria-invalid:border-coral aria-invalid:focus:ring-coral/25 disabled:bg-surface-3 disabled:opacity-70'

type FieldProps = {
    label: ReactNode
    htmlFor: string
    error?: string
    hint?: ReactNode
    optional?: boolean
    className?: string
    children: ReactNode
}

/** Label plus control plus error text. The control should use the same id as `htmlFor`. */
export function Field({label, htmlFor, error, hint, optional, className, children}: FieldProps) {
    return (
        <div className={className}>
            <label htmlFor={htmlFor} className="mb-1.5 block text-[12.5px] font-semibold text-ink">
                {label}
                {optional && <span className="ml-1 text-[11.5px] font-normal text-muted">optional</span>}
            </label>
            {children}
            {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
            {error && <p id={`${htmlFor}-error`} className="mt-1 text-[13px] text-coral-ink">{error}</p>}
        </div>
    )
}

type Invalid = { invalid?: boolean }
const describe = (id: string | undefined, invalid?: boolean) => (invalid && id ? `${id}-error` : undefined)

export function Input({invalid, className, ...rest}: ComponentProps<'input'> & Invalid) {
    return <input aria-invalid={invalid || undefined} aria-describedby={describe(rest.id, invalid)}
                  className={cn(control, 'h-[38px]', className)} {...rest} />
}

export function Select({invalid, className, ...rest}: ComponentProps<'select'> & Invalid) {
    return <select aria-invalid={invalid || undefined} aria-describedby={describe(rest.id, invalid)}
                   className={cn(control, 'h-[38px] pr-2', className)} {...rest} />
}

export function Textarea({invalid, className, ...rest}: ComponentProps<'textarea'> & Invalid) {
    return <textarea aria-invalid={invalid || undefined} aria-describedby={describe(rest.id, invalid)}
                     className={cn(control, 'py-2', className)} {...rest} />
}

type CheckProps = Omit<ComponentProps<'input'>, 'type'> & { id: string; label: ReactNode; boxed?: boolean; error?: string }

export function Checkbox({id, label, boxed, error, className, ...rest}: CheckProps) {
    return (
        <div className={className}>
            <div className={cn('flex items-start gap-2.5', boxed && 'rounded-md border border-line bg-surface-2 p-3')}>
                <input id={id} type="checkbox" aria-invalid={!!error || undefined} aria-describedby={error ? `${id}-error` : undefined}
                       className="mt-0.5 size-4 flex-none accent-primary" {...rest} />
                <label htmlFor={id} className="text-[13.5px] leading-snug text-text">{label}</label>
            </div>
            {error && <p id={`${id}-error`} className="mt-1 text-[13px] text-coral-ink">{error}</p>}
        </div>
    )
}

type SwitchProps = Omit<ComponentProps<'input'>, 'type' | 'role'> & { id: string; label: ReactNode }

export function Switch({id, label, className, ...rest}: SwitchProps) {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <input id={id} type="checkbox" role="switch"
                   className={cn(
                       'relative h-5 w-9 flex-none cursor-pointer appearance-none rounded-full bg-line-2 transition-colors',
                       "before:absolute before:left-0.5 before:top-0.5 before:size-4 before:rounded-full before:bg-white before:transition-transform before:content-['']",
                       'checked:bg-teal-500 checked:before:translate-x-4',
                   )} {...rest} />
            <label htmlFor={id} className="cursor-pointer text-[13px] text-muted">{label}</label>
        </div>
    )
}

/** The grey label above a toolbar filter (smaller than a form label). */
export function ToolbarField({label, htmlFor, children, className}: { label: string; htmlFor: string; children: ReactNode; className?: string }) {
    return (
        <div className={cn('flex min-w-[140px] flex-col sm:flex-[0_1_170px]', className)}>
            <label htmlFor={htmlFor} className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[.1em] text-muted">{label}</label>
            {children}
        </div>
    )
}

/** The filter row that sits between a PanelHead and a table. */
export function Toolbar({className, ...rest}: ComponentProps<'form'>) {
    return <form className={cn('flex flex-wrap items-end gap-3 border-b border-line px-[18px] py-3.5 max-sm:px-4', className)} {...rest} />
}