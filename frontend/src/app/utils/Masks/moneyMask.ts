export const setMoneyMask = (value: string) => {
    const cleanValue = +value.replace(/\D+/g, '');

    const options = { style: 'currency', currency: 'BRL' };

    return new Intl.NumberFormat('pt-br', options)
        .format(cleanValue / 100);
}

export const removeMoneyMask = (value: string) => {
    return value
      .replace(/\./g, "")
      .replace("R$", "")
      .trim();
  }