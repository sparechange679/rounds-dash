import {useEffect, useRef, useState} from 'react'

/** Tracks an element's content width. Returns 0 until the first measurement. */
export function useElementWidth<T extends HTMLElement>() {
    const ref = useRef<T>(null)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        // ResizeObserver reports once on observe(), so no separate initial read is needed.
        const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)))
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    return [ref, width] as const
}