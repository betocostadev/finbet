// export async function GET(request: Request) {
//   return Response.json({ hello: 'world' })
// }

import { API_KEY } from '@/constants/Keys'

// You can test at localhost:8081/api/info?id=1
export async function GET(request: Request) {
  const url = new URL(request.url)
  const ids = url.searchParams.get('id')

  if (!API_KEY) {
    throw new Error('API key is missing')
  }

  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${ids}`,
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
