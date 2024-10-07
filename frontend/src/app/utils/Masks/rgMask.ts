export const setRgMask = (value: string, errChar = "?"): string => {
    value = value.replace(/\D/g, "");

    // Limit the length of RG to 9 characters
    value = value.slice(0, 9);

    // Apply the RG mask: "XX.XXX.XXX-X"
    value = value.replace(/(\d{2})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,1})$/, "$1-$2");

    return value;
}