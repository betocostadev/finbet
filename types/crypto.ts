export interface Currency {
  id: number
  name: string
  symbol: string
  slug: string
  num_market_pairs: number
  date_added: string
  tags: string[]
  max_supply: number
  circulating_supply: number
  total_supply: number
  infinite_supply: boolean
  platform?: any
  cmc_rank: number
  self_reported_circulating_supply?: any
  self_reported_market_cap?: any
  tvl_ratio?: any
  last_updated: string
  quote: Quote
}

interface Quote {
  BRL: BRL
}

interface EUR {
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
  tvl?: any
  last_updated: string
}

interface BRL {
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
  tvl?: any
  last_updated: string
}

export interface Ticker {
  timestamp: string
  price: number
  volume_24h: number
  market_cap: number
}

export interface CryptoCurrency {
  category: string
  contract_address: any[]
  date_added: string
  date_launched: string
  description: string
  id: number
  infinite_supply: boolean
  is_hidden: number
  logo: string
  name: string
  notice: string
  platform: any | null
  self_reported_circulating_supply: number | null
  self_reported_market_cap: number | null
  self_reported_tags: any | null
  slug: string
  subreddit: string
  symbol: string
  tag_groups: string[]
  tag_names: string[]
  tags: string[]
  twitter_username: string
  urls: {
    announcement: string[]
    chat: string[]
    explorer: string[]
    facebook: string[]
    message_board: string[]
    reddit: string[]
    source_code: string[]
    technical_doc: string[]
    twitter: string[]
    website: string[]
  }
}
