import type {AvatarTint} from '@/components/ui/Avatar.tsx'

const TINTS: AvatarTint[] = ['navy', 'teal', 'coral', 'amber', 'sky', 'slate']

/** Same name-to-colour rule as the original main.js, so avatars keep their colours. */
export function tintOf(name: string): AvatarTint {
    let sum = 0
    for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i)
    return TINTS[sum % TINTS.length]
}

export function initialsOf(name: string) {
    const parts = name.replace(/^Dr\.\s+/, '').trim().split(/\s+/)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}