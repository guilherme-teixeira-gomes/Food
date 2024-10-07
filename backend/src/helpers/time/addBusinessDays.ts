function addBusinessDays(startDate: string, daysToAdd: number) {
    const result = new Date(startDate);

    while (daysToAdd > 0) {
        result.setDate(result.getDate() + 1);

        if (result.getDay() !== 0 && result.getDay() !== 6) {
            daysToAdd--;
        }
    }

    return result;
}

export default addBusinessDays;