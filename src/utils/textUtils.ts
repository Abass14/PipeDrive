/**
 * capitalizes the first letter in a text string
 * @param text 
 * @returns string | undefined
 */
export function capitalize (text: string) : string | undefined {
    if (!text.length) return
    const split = text.split("")
    split[0] = split[0].toLocaleUpperCase()
    return split.join("")
}