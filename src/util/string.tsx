export const isAlpha = (str: string) => {
    return str.length === 1 && /^[a-zA-Z]+$/.test(str)
}