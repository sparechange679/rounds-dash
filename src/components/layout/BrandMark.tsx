export function BrandMark({className = 'size-8'}: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
            <rect width="32" height="32" rx="8" fill="#5ee0c1"/>
            <circle cx="16" cy="16" r="9" fill="none" stroke="#0b2a4a" strokeWidth="2.6" strokeLinecap="round"
                    strokeDasharray="46 11" transform="rotate(-58 16 16)"/>
            <path d="M16 12.2v7.6M12.2 16h7.6" stroke="#0b2a4a" strokeWidth="2.6" strokeLinecap="round"/>
        </svg>
    )
}