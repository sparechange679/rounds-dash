import {Link} from 'react-router-dom'
import {Avatar, type AvatarTint} from '@/components/ui/Avatar.tsx'

type Props = { name: string; mrn: string; initials: string; tint?: AvatarTint; size?: 'sm' | 'md'; to?: string }

export function PatientCell({name, mrn, initials, tint, size = 'sm', to}: Props) {
    const nameClass = 'block text-[13.5px] font-semibold leading-tight text-ink'
    return (
        <div className="flex min-w-0 items-center gap-2.5">
            <Avatar initials={initials} tint={tint} size={size}/>
            <div className="min-w-0">
                {to
                    ? <Link to={to} className={`${nameClass} hover:text-link`}>{name}</Link>
                    : <span className={nameClass}>{name}</span>}
                <span className="block font-mono text-[11.5px] text-muted">{mrn}</span>
            </div>
        </div>
    )
}