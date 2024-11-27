import { API_KEY } from '@/constants/Keys'

// You can test at http://localhost:8081/api/listings
export async function GET(request: Request) {
  const url = new URL(request.url)
  const limit = url.searchParams.get('limit') || 5

  if (!API_KEY) {
    throw new Error('API key is missing')
  }
  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${limit}&convert=BRL`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
    }
  )

  const res = await response.json()

  return new Response(JSON.stringify(res.data), {
    headers: { 'Content-Type': 'application/json' },
  })
}
