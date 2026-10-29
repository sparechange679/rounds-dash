import {census} from '../../data/census'
import {cn} from '../../lib/cn'

export function CensusBar() {
    return (
        <div role="region" aria-label="Hospital census at 09:42"
             className="flex h-[38px] items-center gap-4 border-b border-line bg-census px-4 font-mono text-xs lg:px-6">
            <ul className="flex min-w-0 flex-1 overflow-x-auto pr-9 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(90deg,#000_calc(100%-36px),transparent)]">
                {census.map((c) => (
                    <li key={c.label}
                        className="flex items-baseline gap-[7px] whitespace-nowrap border-l border-line-2 px-3 first:border-l-0 first:pl-0">
                        <span className="text-[10.5px] uppercase tracking-[.06em] text-muted">{c.label}</span>
                        <span
                            className={cn('font-semibold', c.tone === 'alert' ? 'text-coral-ink' : c.tone === 'warn' ? 'text-amber-ink' : 'text-ink')}>
              {c.value}
                            {c.of && <span className="font-normal text-muted">{c.of}</span>}
            </span>
                    </li>
                ))}
            </ul>
            <span className="hidden flex-none items-center gap-[7px] text-[11.5px] text-muted md:flex">
        <span className="relative size-[7px] rounded-full bg-teal-500" aria-hidden="true">
          <span className="absolute -inset-1 animate-ping rounded-full border-2 border-teal-500 opacity-60"/>
        </span>
        Updated 09:42
      </span>
        </div>
    )
}