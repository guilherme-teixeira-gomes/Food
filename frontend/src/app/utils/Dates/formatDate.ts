export default function formatDate(dateString: string) {
    const parts = dateString.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
}