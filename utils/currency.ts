export const formatCurrency = (value: string) => {
  const numericValue = parseFloat(value.replace(/[^0-9]/g, '')) / 100
  return numericValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
