import {useEffect, useRef} from 'react'

/** Wires a native <dialog> to an `open` flag. Esc and backdrop clicks call onClose. */
export function useDialog(open: boolean, onClose: () => void) {
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const d = ref.current
        if (!d) return
        if (open && !d.open) d.showModal()
        if (!open && d.open) d.close()
        if (open) document.documentElement.style.overflow = 'hidden'
        return () => {
            document.documentElement.style.overflow = ''
        }
    }, [open])

    return {
        ref,
        handlers: {
            onCancel: (e: React.SyntheticEvent) => {
                e.preventDefault() // let React state drive closing
                onClose()
            },
            onClick: (e: React.MouseEvent<HTMLDialogElement>) => {
                if (e.target === e.currentTarget) onClose() // backdrop click
            },
        },
    }
}