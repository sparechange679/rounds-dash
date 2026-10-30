import {useId, type ReactNode} from 'react'
import {useDialog} from '@/hooks/useDialog.ts'
import {IconButton} from "@/components/ui/IconButton.tsx";
import {Icon} from "@/components/icons/Icon.tsx";

type Props = { open: boolean; onClose: () => void; title: string; kicker?: string; children: ReactNode }

export function Drawer({open, onClose, title, kicker, children}: Props) {
    const {ref, handlers} = useDialog(open, onClose)
    const titleId = useId()

    return (
        <dialog
            ref={ref}
            aria-labelledby={titleId}
            {...handlers}
            className="m-0 ml-auto h-dvh max-h-none w-[540px] max-w-full flex-col bg-surface p-0 text-text shadow-3 backdrop:bg-[#04101d]/55 open:flex open:animate-drawer-in"
        >
            {open && (
                <>
                    <div className="flex flex-none items-start justify-between gap-3 border-b border-line px-[22px] py-[18px]">
                        <div>
                            {kicker && <p className="mb-[3px] font-mono text-[10.5px] font-semibold uppercase tracking-[.12em] text-teal">{kicker}</p>}
                            <h2 id={titleId} className="text-[19px] font-semibold tracking-[-.01em] text-ink">{title}</h2>
                        </div>
                        <IconButton aria-label={`Close ${title.toLowerCase()}`} onClick={onClose}><Icon name="close"/></IconButton>
                    </div>
                    <div className="flex-1 overflow-y-auto px-[22px] py-5">{children}</div>
                </>
            )}
        </dialog>
    )
}

/** Cancel/submit row pinned to the bottom of a form inside a Drawer or Modal. */
export function FormActions({children}: { children: ReactNode }) {
    return <div className="mt-5 flex justify-end gap-2 border-t border-line pt-4">{children}</div>
}