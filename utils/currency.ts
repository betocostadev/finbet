export const formatCurrencyBRLString = (value: string | number): string => {
  if (typeof value === 'string') {
    value = parseFloat(value.replace(/\D/g, '')) / 100
  }
  return value
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    .replace('R$', '')
    .trim()
}

export const parseBRLCurrencyToFloat = (value: string) => {
  const num = parseFloat(value.replace(/\D/g, '')) / 100
  if (isNaN(num)) {
    return 0
  }
  return num
}
