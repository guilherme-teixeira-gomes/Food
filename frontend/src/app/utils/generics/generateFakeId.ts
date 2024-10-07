export function generateFakeId() {
    const timestamp = new Date().getTime().toString();
    const randomNum = Math.random().toString().substr(2, 5);
    const uniqueId = timestamp + randomNum;
    return Number(uniqueId);
}
