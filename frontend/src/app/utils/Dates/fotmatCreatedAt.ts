export function fotmatCreatedAt(createdAt?: string) {
    if (!createdAt) return "---";

    const dateObj = new Date(createdAt);

    const formattedDate = dateObj.toLocaleDateString("pt-BR", {
        timeZone: "UTC",
    });

    const formattedTime = dateObj.toLocaleTimeString("pt-BR", {
        timeZone: "UTC",
    });

    return `${formattedDate} às ${formattedTime}`;
}