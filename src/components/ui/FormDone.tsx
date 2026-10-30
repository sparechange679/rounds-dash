import {useEffect, useRef, type ReactNode} from 'react'
import {cn} from '@/lib/cn.ts'
import {Icon} from "@/components/icons/Icon.tsx";

type Props = { title?: string; children: ReactNode; actions?: ReactNode; inline?: boolean }

/** Success state shown in place of a form. Takes focus on mount, like the original. */
export function FormDone({title, children, actions, inline}: Props) {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => ref.current?.focus(), [])

    return (
        <div ref={ref} tabIndex={-1} role="status"
             className={cn('outline-none', inline
                 ? 'mt-4 grid justify-items-start gap-2.5 rounded-lg border border-teal-line bg-tint-teal p-4'
                 : 'px-[26px] py-[34px] text-center')}>
      <span className={cn('inline-grid place-items-center rounded-full text-teal', inline ? 'size-9 bg-surface' : 'mb-3 size-[52px] bg-tint-teal')}>
        <Icon name="check" className={inline ? 'size-5' : 'size-6'}/>
      </span>
            {title && <h3 className="mb-1.5 text-lg">{title}</h3>}
            <div className={cn('text-sm', !inline && 'mx-auto mb-4 max-w-[42ch]')}>{children}</div>
            {actions && <div className="flex justify-center gap-2">{actions}</div>}
        </div>
    )
}