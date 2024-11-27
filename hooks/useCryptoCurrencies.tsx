import { useQuery } from '@tanstack/react-query'
import { Currency } from '@/types/crypto'

const useCryptoCurrencies = () => {
  const {
    isPending,
    error,
    data: currencies,
  } = useQuery<Currency[]>({
    queryKey: ['listings'],
    queryFn: () => fetch('/api/listings').then((res) => res.json()),
  })

  return { isPending, error, currencies }
}

export default useCryptoCurrencies
