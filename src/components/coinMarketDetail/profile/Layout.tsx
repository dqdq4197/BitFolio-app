/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import useCoinDetail from '/hooks/data/useCoinDetail'
import useLocales from '/hooks/useLocales'
import { useCoinIdContext } from '/hooks/context/useCoinIdContext'

import ScrollView from '/components/common/ScrollView'
import Description from './Description'
import Link from './Link'

const Layout = () => {
  const { id } = useCoinIdContext()
  const { data } = useCoinDetail({ id })
  const { language } = useLocales()

  if (!data) return <></>

  return (
    <ScrollView>
      <Description
        localization={data.localization[language]}
        symbol={data.symbol}
        content={data.description[language]}
        imageSrc={data.image.large}
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

export default Layout
