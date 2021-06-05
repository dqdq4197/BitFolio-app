export type CoinMarketReturn = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price:number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h:number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h:number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date:string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
  price_change_percentage_1h_in_currency?: number;
  sparkline_in_7d: {
    price: number[]
  }
}

export type CharDataReturn = {
  prices: number[][],
  market_caps: number[][],
  total_volumes: number[][]
}
export interface CoinDetailDataReturn {
  id:                              string;
  symbol:                          string;
  name:                            string;
  asset_platform_id:               null;
  platforms:                       Platforms;
  block_time_in_minutes:           number;
  hashing_algorithm:               string;
  categories:                      string[];
  public_notice:                   null;
  additional_notices:              any[];
  localization:                    { [key in Language]: string };
  description:                     { [key in Language]: string };
  links:                           Links;
  image:                           Image;
  country_origin:                  string;
  genesis_date:                    string;
  sentiment_votes_up_percentage:   number;
  sentiment_votes_down_percentage: number;
  market_cap_rank:                 number;
  coingecko_rank:                  number;
  coingecko_score:                 number;
  developer_score:                 number;
  community_score:                 number;
  liquidity_score:                 number;
  public_interest_score:           number;
  market_data:                     MarketData;
  tickers: TickersType[] | [];
  community_data:                  CommunityData;
  developer_data:                  DeveloperData;
  public_interest_stats:           PublicInterestStats;
  status_updates:                  any[];
  last_updated:                    string;
}

export interface SearchDataReturn {
  coins:      SearchCoin[];
  exchanges:  SearchExchange[];
  icos:       any[];
  categories: SearchCategory[];
}

export interface GlobalReturn {
  data: {
    active_cryptocurrencies:              number;
    upcoming_icos:                        number;
    ongoing_icos:                         number;
    ended_icos:                           number;
    markets:                              number;
    total_market_cap:                     { [key: string]: number };
    total_volume:                         { [key: string]: number };
    market_cap_percentage:                { [key: string]: number };
    market_cap_change_percentage_24h_usd: number;
    updated_at:                           number;
  }
}

export interface SearchCategory {
  id:   string;
  name: string;
}

export interface SearchCoin {
  id:              string;
  name:            string;
  symbol:          string;
  market_cap_rank: number | null;
  thumb:           string;
  large:           string;
}

export interface SearchExchange {
  id:          string;
  name:        string;
  market_type: MarketType;
  thumb:       string;
  large:       string;
}

export interface SearchTrandingReturn {
  coins:     SearchTrandingCoin[];
  exchanges: any[];
}

export interface SearchTrandingCoin {
  item: SearchTrandingCoinItem;
}

export interface SearchTrandingCoinItem {
  id:              string;
  coin_id:         number;
  name:            string;
  symbol:          string;
  market_cap_rank: number;
  thumb:           string;
  small:           string;
  large:           string;
  slug:            string;
  price_btc:       number;
  score:           number;
}


export enum MarketType {
  Futures = "futures",
  Spot = "spot",
}

export type Language =
  | "en"
  | "de"
  | "es"
  | "fr"
  | "it"
  | "pl"
  | "ro"
  | "hu"
  | "nl"
  | "pt"
  | "sv"
  | "vi"
  | "tr"
  | "ru"
  | "ja"
  | "zh"
  | "zh-tw"
  | "ko"
  | "ar"
  | "th"
  | "id"
export interface CommunityData {
  facebook_likes:              null;
  twitter_followers:           number;
  reddit_average_posts_48h:    number;
  reddit_average_comments_48h: number;
  reddit_subscribers:          number;
  reddit_accounts_active_48h:  number;
  telegram_channel_user_count: null;
}

export interface TickersType {
  base: string,
  target: string,
  market: {
    name: string,
    identifier: string,
    has_trading_incentive: boolean
  },
  last: number,
  volume: number,
  converted_last: {
    btc: number,
    eth: number,
    usd: number
  },
  converted_volume: {
    btc: number,
    eth: number,
    usd: number
  },
  trust_score: string,
  bid_ask_spread_percentage: number,
  timestamp:string,
  last_traded_at:string,
  last_fetch_at: string,
  is_anomaly: string,
  is_stale: string,
  trade_url: string,
  token_info_url: string | null,
  coin_id: string,
  target_coin_id: string
}
export interface DeveloperData {
  forks:                               number;
  stars:                               number;
  subscribers:                         number;
  total_issues:                        number;
  closed_issues:                       number;
  pull_requests_merged:                number;
  pull_request_contributors:           number;
  code_additions_deletions_4_weeks:    CodeAdditionsDeletions4_Weeks;
  commit_count_4_weeks:                number;
  last_4_weeks_commit_activity_series: number[];
}

export interface CodeAdditionsDeletions4_Weeks {
  additions: number;
  deletions: number;
}

export interface Image {
  thumb: string;
  small: string;
  large: string;
}

export interface Links {
  homepage:                      string[];
  blockchain_site:               string[];
  official_forum_url:            string[];
  chat_url:                      string[];
  announcement_url:              string[];
  twitter_screen_name:           string;
  facebook_username:             string;
  bitcointalk_thread_identifier: null;
  telegram_channel_identifier:   string;
  subreddit_url:                 string;
  repos_url:                     ReposURL;
}

export interface ReposURL {
  github:    string[];
  bitbucket: any[];
}

export interface MarketData {
  current_price:                                { [key: string]: number };
  roi:                                          null;
  ath:                                          { [key: string]: number };
  ath_change_percentage:                        { [key: string]: number };
  ath_date:                                     { [key: string]: string };
  atl:                                          { [key: string]: number };
  atl_change_percentage:                        { [key: string]: number };
  atl_date:                                     { [key: string]: string };
  market_cap:                                   { [key: string]: number };
  market_cap_rank:                              number;
  fully_diluted_valuation:                      { [key: string]: number };
  total_volume:                                 { [key: string]: number };
  high_24h:                                     { [key: string]: number };
  low_24h:                                      { [key: string]: number };
  price_change_24h:                             number;
  price_change_percentage_24h:                  number;
  price_change_percentage_7d:                   number;
  price_change_percentage_14d:                  number;
  price_change_percentage_30d:                  number;
  price_change_percentage_60d:                  number;
  price_change_percentage_200d:                 number;
  price_change_percentage_1y:                   number;
  market_cap_change_24h:                        number;
  market_cap_change_percentage_24h:             number;
  price_change_24h_in_currency:                 { [key: string]: number };
  price_change_percentage_1h_in_currency:       { [key: string]: number };
  price_change_percentage_24h_in_currency:      { [key: string]: number };
  price_change_percentage_7d_in_currency:       { [key: string]: number | {} };
  price_change_percentage_14d_in_currency:      { [key: string]: number | {} };
  price_change_percentage_30d_in_currency:      { [key: string]: number | {} };
  price_change_percentage_60d_in_currency:      { [key: string]: number | {} };
  price_change_percentage_200d_in_currency:     { [key: string]: number | {} };
  price_change_percentage_1y_in_currency:       { [key: string]: number | {} };
  market_cap_change_24h_in_currency:            { [key: string]: number };
  market_cap_change_percentage_24h_in_currency: { [key: string]: number };
  total_supply:                                 number;
  max_supply:                                   number;
  circulating_supply:                           number;
  last_updated:                                 string;
}

export interface Platforms {
  "": string;
}

export interface PublicInterestStats {
  alexa_rank:   number;
  bing_matches: null;
}
