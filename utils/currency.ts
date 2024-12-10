export const formatCurrencyBRL = (value: string) => {
  const numericValue = parseFloat(value.replace(/\D/g, '')) / 100
  return numericValue
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

export const displayBRLCurrencyNumber = (value: number) => {
  return value
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    .replace('R$', '')
    .trim()
}
