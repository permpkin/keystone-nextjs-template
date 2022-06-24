import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths
} from 'next'

import {
  BlockLayoutProps,
  PageBlocksLayout
} from '@/components/PageBlocksLayout'

import { query } from '.keystone/api'

import config from '../../config'

const PathMatch: NextPage<BlockLayoutProps> = ({
  title,
  description,
  document
}) => {
  return (
    <PageBlocksLayout {...{ title, description, document }}/>
  )
}

export const getStaticProps: GetStaticProps = async (context: any) => {

  const [page] = await query.Page.findMany({
    where: {
      path: {
        equals: `${context.params?.path?.join('/')||''}`
      }
    },
    take: 1,
    query: `title description document { document } path`
  });
  
  return {
    props: {
      title: `${config.SITE_TITLE}${page?.title!=undefined?` | ${page.title}`:''}`,
      description: page?.description || '',
      document: page?.document.document || []
    }
  }

}

// pre-populate paths from registered pages.
export const getStaticPaths: GetStaticPaths = async () => {

  const pages = await query.Page.findMany({
    query: 'path'
  });

  const paths = pages.map(({ path }) => {
    return {
      params: {
        path: `${path}`.split('/')
      }
    }
  })

  return {
    paths,
    fallback: false // fallback to 404 if no match
  };
}

export default PathMatch