export const pad2 = (n: number) => String(n).padStart(2, '0')

export const clockNow = () => {
    const d = new Date()
    return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`
}