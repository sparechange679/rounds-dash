import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react'
import {AnnounceContext} from '@/hooks/useAnnounce.ts'
import {cn} from '@/lib/cn.ts'

export function Announcer({children}: { children: ReactNode }) {
    const [message, setMessage] = useState('')
    const [visible, setVisible] = useState(false)
    const timer = useRef<number>(undefined)

    const announce = useCallback((msg: string) => {
        setMessage(msg)
        setVisible(true)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setVisible(false), 3600)
    }, [])

    useEffect(() => () => window.clearTimeout(timer.current), [])

    return (
        <AnnounceContext value={announce}>
            {children}
            <div role="status" aria-live="polite"
                 className={cn(
                     'pointer-events-none fixed bottom-5 right-5 z-[1090] max-w-[min(380px,calc(100vw-40px))] rounded-lg bg-ink px-3.5 py-3 text-[13.5px] text-surface shadow-3 transition-all duration-200',
                     visible ? 'translate-y-0 opacity-100' : 'translate-y-2.5 opacity-0',
                 )}>
                {message}
            </div>
        </AnnounceContext>
    )
}