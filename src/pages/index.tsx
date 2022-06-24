import type {
  GetStaticProps
} from 'next'

import PathMatch from './[...path]'

import { query } from '.keystone/api'

import config from '../../config'

export const getStaticProps: GetStaticProps = async () => {

  // get page doc marked as the home page.
  const [page] = await query.Page.findMany({
    where: {
      isHome: {
        equals: true
      }
    },
    take: 1,
    query: `title description blocks path`
  });

  // if no home page is
  // set return 404 page.
  if (!page) return {
    notFound: true
  }

  const pages = await query.Page.findMany({
    query: 'title path'
  });
  
  return {
    props: {
      title: `${config.SITE_TITLE}${page.title!=undefined?` | ${page.title}`:''}`,
      description: page.description,
      blocks: page.blocks,
      pages
    }
  }

}

export default PathMatch