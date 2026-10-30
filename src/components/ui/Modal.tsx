import {useId, type ReactNode} from 'react'
import {useDialog} from '@/hooks/useDialog.ts'
import {cn} from '@/lib/cn.ts'
import {IconButton} from "@/components/ui/IconButton.tsx";
import {Icon} from "@/components/icons/Icon.tsx";

type Props = { open: boolean; onClose: () => void; title: string; kicker?: string; size?: 'md' | 'lg'; children: ReactNode }

export function Modal({open, onClose, title, kicker, size = 'md', children}: Props) {
    const {ref, handlers} = useDialog(open, onClose)
    const titleId = useId()

    return (
        <dialog
            ref={ref}
            aria-labelledby={titleId}
            {...handlers}
            className={cn(
                'm-auto max-h-[calc(100dvh-24px)] w-[calc(100%-24px)] flex-col overflow-hidden rounded-[10px] border border-line bg-surface p-0 text-text shadow-3',
                'backdrop:bg-[#04101d]/55 open:flex open:animate-modal-in',
                size === 'lg' ? 'max-w-[800px]' : 'max-w-[500px]',
            )}
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
                    <div className="overflow-y-auto">{children}</div>
                </>
            )}
        </dialog>
    )
}

export const ModalBody = ({children}: { children: ReactNode }) => <div className="px-[22px] py-5">{children}</div>

export const ModalFooter = ({children}: { children: ReactNode }) => (
    <div className="flex flex-wrap justify-end gap-2 border-t border-line px-[22px] py-3.5">{children}</div>
)