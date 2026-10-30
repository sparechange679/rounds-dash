type Cell = string | number

const escape = (v: Cell) => {
    const s = String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export const toCsv = (rows: Cell[][]) => rows.map((r) => r.map(escape).join(',')).join('\n')

export function downloadCsv(filename: string, rows: Cell[][]) {
    const url = URL.createObjectURL(new Blob([toCsv(rows)], {type: 'text/csv;charset=utf-8'}))
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
}