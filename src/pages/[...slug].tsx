import Footer from '@/components/Footer/'
import Header from '@/components/Header/'

import type {
  NextPage,
  // GetStaticProps,
  // GetStaticPaths,
  GetServerSideProps
} from 'next'
import Head from 'next/head'

import { query } from '.keystone/api';
import { PageTitleBuilder } from '@/utils/PageTitleBuilder'
import { memo } from 'react'

const PathMatch: NextPage = ({ title, description, blocks }: any) => {

  // Memoize blocks attached to page.
  const PageBlocks = memo(() => {
    if (!blocks) return null;
    return (
      blocks.map((block: any, index: number) => {
        const Block = require(`@/blocks/${block.type}/`).default
        return (
          <Block key={`block-${index}`} {...block.props}/>
        )
      })
    )
  })
  
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
        <PageBlocks/>
      </main>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

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

// pre-populate the current request static props (i.e. slug)
// export const getStaticProps: GetStaticProps = async (context: any) => {

//   const REF_TYPE = 'page'

//   const route = await query.Route.findOne({
//     where: {
//       path: `/${context.params.slug.join('/')}`
//     },
//     query: `${REF_TYPE} { title description blocks }`
//   });

//   return {
//     // will be passed to the page component as props
//     props: {
//       slug: context.params.slug,
//       title: route[REF_TYPE]?.title,
//       description: route[REF_TYPE]?.description,
//       blocks: route[REF_TYPE]?.blocks
//     }
//   }
// }

// pre-populate paths from registered routes.
// export const getStaticPaths: GetStaticPaths = async () => {

//   const paths = await query.Route.findMany({
//     query: 'path'
//   });

//   return {
//     paths: paths.map(({ path }) => {
//       return {
//         params: {
//           slug: [path.replace(/^\//, '')]
//         }
//       }
//     }),
//     fallback: false // fallback to 404 if no match
//   };
// }

export default PathMatch