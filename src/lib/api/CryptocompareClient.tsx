import { CTYPTOCOMPARE_PATH_PREFIX, APP_NAME, CTYPTOCOMPARE_LANG } from '/lib/constant';

export type LANG = typeof CTYPTOCOMPARE_LANG[keyof typeof CTYPTOCOMPARE_LANG];

interface CommonParams {
  extraParams?: string,
  sign?: boolean,
}
interface ArticleParams extends CommonParams {
  feeds?: string | string[],
  categories?: string | string[],
  excludeCategories?: string,
  lTs?: number,
  lang?: LANG,
  sortOrder?: 'latest' | 'popular'
  extraParams?: string,
  sign?: boolean,
}
interface FeedPrams extends CommonParams {}
interface CategoryPrams extends CommonParams {}
interface FeedAndCategoryPrams extends CommonParams {}

export const Cryptocompare = {
  news: {
    /**
     * @description Returns news articles from the providers that CryptoCompare has integrated with.
     * @function news.articles()
     * @param {object} params - Parameters to pass through to the request
     * @param {array|string} params.feeds Specific news feeds to retrieve news from [ Min length - 1] [ Max length - 1000] [ Default - ALL_NEWS_FEEDS]
     * @param {array|string} params.categories - Category of news articles to return [ Min length - 3] [ Max length - 1000] [ Default - ALL_NEWS_CATEGORIES]
     * @param {string} params.excludeCategories - News article categories to exclude from results [ Min length - 3] [ Max length - 1000] [ Default - NO_EXCLUDED_NEWS_CATEGORIES]
     * @param {number} params.lTs - Returns news before that timestamp [ Min - 0] [ Default - 0]
     * @param {number} params.lang - Preferred language - English (EN) or Portuguese (PT) [ Min length - 1] [ Max length - 4] [ Default - EN]
     * @param {boolean} params.sortOrder The order to return news articles - latest or popular [ Min length - 1] [ Max length - 8] [ Default - latest]
     * @param {boolean} params.sign If set to true, the server will sign the requests (by default we don't sign them), this is useful for usage in smart contracts [ Default - false]
     * @param {boolean} params.extraParams The name of your application (we recommend you send it) [ Min length - 1] [ Max length - 2000] [ Default - NotAvailable]
     * @returns {ReturnObject}
     */
    articles: (params: ArticleParams) => {
      params.extraParams = APP_NAME;
      return {
        url: `${CTYPTOCOMPARE_PATH_PREFIX}/news`,
        params
      }
    },
    /**
     * @description Returns all the news feeds (providers) that CryptoCompare has integrated with.
     * @function news.feeds()
     * @param {object} params - Parameters to pass through to the request
     * @param {string} params.sign If set to true, the server will sign the requests (by default we don't sign them), this is useful for usage in smart contracts [ Default - false]
     * @param {boolean} params.extraParams The name of your application (we recommend you send it) [ Min length - 1] [ Max length - 2000] [ Default - NotAvailable]
     * @returns {ReturnObject}
     */
    feeds: (params: FeedPrams) => {
      params.extraParams = APP_NAME;
      return {
        url: `${CTYPTOCOMPARE_PATH_PREFIX}/news/feeds`,
        params
      }
    },
    categories: (params: CategoryPrams) => {
      params.extraParams = APP_NAME;
      return {
        url: `${CTYPTOCOMPARE_PATH_PREFIX}/news/categories`,
        params
      }
    },
    feedAndCategories: (params: FeedAndCategoryPrams) => {
      params.extraParams = APP_NAME;
      return {
        url: `${CTYPTOCOMPARE_PATH_PREFIX}/news/feedsandcategories`,
        params
      }
    },
  }
  
}