export function LiveDot() {
    return (
        <span className="relative inline-block size-[7px] flex-none rounded-full bg-teal-500" aria-hidden="true">
            <span className="absolute -inset-1 animate-ping rounded-full border-2 border-teal-500 opacity-60"/>
        </span>
    )
}