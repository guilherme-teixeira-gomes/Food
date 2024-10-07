export const nullCheckForFormdata = (value: any | null): string => {
    return value
        ? String(value)
        : ""
}