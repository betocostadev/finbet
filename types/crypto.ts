interface CryptoQuote {
  price: number
  volume_24h: number
  volume_change_24h: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  percent_change_30d: number
  percent_change_60d: number
  percent_change_90d: number
  market_cap: number
  market_cap_dominance: number
  fully_diluted_market_cap: number
  tvl: number | null
  last_updated: string
}

export interface CryptoData {
  total_supply: number
  infinite_supply: boolean
  platform: any
  cmc_rank: number
  self_reported_circulating_supply: number | null
  self_reported_market_cap: number | null
  tvl_ratio: number | null
  last_updated: string
  quote: {
    BRL: CryptoQuote
  }
}
