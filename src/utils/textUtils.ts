export function capitalize (text: string) : string | undefined {
    if (!text.length) return
    const split = text.split("")
    split[0] = split[0].toLocaleUpperCase()
    return split.join("")
}