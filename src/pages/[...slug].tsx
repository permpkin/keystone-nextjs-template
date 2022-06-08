import Footer from '@/components/Footer/'
import Header from '@/components/Header/'

import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths
} from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import { query } from '.keystone/api';
import { PageTitleBuilder } from '@/utils/PageTitleBuilder'

const PathMatch: NextPage = ({ title, description, blocks }: any) => {
  
  const PageTitle = PageTitleBuilder(title);

  return (
    <>
      <Head>
        <title key="title">{PageTitle}</title>
        <meta property="og:title" content={PageTitle} key="og-title" />
        <meta name="description" content={description} key="description"/>
      </Head>
      <Header />
      <main>
        {blocks && blocks.map((block: any, index: number) => {
          const Block = dynamic(
            () => import(`@/blocks/${block.type}/`),
            {
              loading: () => <p>...</p>,
              ssr: true
            }
          )
          return (
            <Block key={`block-${index}`} {...block.props}/>
          )
        })}
      </main>
      <Footer />
    </>
  )
}

// pre-populate the current request static props (i.e. slug)
export const getStaticProps: GetStaticProps = async (context: any) => {

  const REF_TYPE = 'page'

  const route = await query.Route.findOne({
    where: {
      path: `/${context.params.slug.join('/')}`
    },
    query: `${REF_TYPE} { title description blocks }`
  });

  return {
    // will be passed to the page component as props
    props: {
      slug: context.params.slug,
      title: route[REF_TYPE]?.title,
      description: route[REF_TYPE]?.description,
      blocks: route[REF_TYPE]?.blocks
    }
  }
}

// pre-populate paths from registered routes.
export const getStaticPaths: GetStaticPaths = async () => {

  const paths = await query.Route.findMany({
    query: 'path'
  });

  return {
    paths: paths.map(({ path }) => {
      return {
        params: {
          slug: [path.replace(/^\//, '')]
        }
      }
    }),
    fallback: false // fallback to 404 if no match
  };
}

export default PathMatch