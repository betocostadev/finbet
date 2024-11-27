import { useQuery } from '@tanstack/react-query'

const useLogos = (ids: string | undefined) => {
  const { data } = useQuery<Record<string, { id: string; logo: string }>>({
    queryKey: ['infos', 'idsa'],
    queryFn: () => fetch(`/api/info?id=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  })

  const transformedData = data
    ? Object.keys(data).reduce((acc, key) => {
        acc[key] = { id: data[key].id, logo: data[key].logo }
        return acc
      }, {} as Record<string, { id: string; logo: string }>)
    : null

  return transformedData
}

export default useLogos
