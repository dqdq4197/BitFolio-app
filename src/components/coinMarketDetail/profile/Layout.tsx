import React, { useContext, useEffect } from 'react';
import { CoinIdContext } from '/screens/coinMarket/detail';
import useCoinDetailInfoData from '/hooks/useCoinDetailData';
import useLocales from '/hooks/useLocales';
import ScrollView from '/components/common/ScrollView';
import Description from './Description';
import Link from './Link';

const Layout = () => {
  const coinId = useContext(CoinIdContext) as string;
  const { data } = useCoinDetailInfoData(coinId);
  const { language, currency } = useLocales();

  if(!data) return <></>

  return (
    <ScrollView>
      <Description
        localization={data.localization[language]}
        symbol={data.symbol}
        content={data.description[language]}
      />
      <Link 
        websites={data.links.homepage}
        explorers={data.links.blockchain_site}
        officialForums={data.links.official_forum_url}
        reddit={data.links.subreddit_url}
        githubs={data.links.repos_url.github}
        twitterScreenName={data.links.twitter_screen_name}
        facebookUsername={data.links.facebook_username}
      />
    </ScrollView>
  )
}

export default Layout;