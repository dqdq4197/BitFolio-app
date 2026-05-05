/* eslint-disable jsx-a11y/anchor-is-valid */

import useCoinDetail from '@/hooks/data/use-coin-detail'
import useLocales from '@/hooks/use-locales'
import { useCoinIdContext } from '@/hooks/context/use-coin-id-context'

import ScrollView from '@/components/common/scroll-view'
import Description from './description'
import Link from './link'

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
