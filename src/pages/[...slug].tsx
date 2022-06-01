import Footer from '@/components/Footer'
import Header from '@/components/Header'
import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths
} from 'next'

import Head from 'next/head'
import dynamic from 'next/dynamic'

const Route: NextPage = (context: any) => {
  
  return (
    <>
      <Head>
        {/* <title>{context.slug.join('/')}</title> */}
      </Head>
      <Header />
      <main>
        {context.blocks && context.blocks.map((block: any, index: number) => {
          const Block = dynamic(
            () => import(`@/components/blocks/${block.type}/`),
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

  return {
    // will be passed to the page component as props
    props: {
      slug: context.params.slug,
      blocks: [
        { type: 'Example', props: {} }
      ]
    }
  }
}

// pre-populate paths from registered routes.
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { slug: ["test"] }
      }
    ],
    fallback: false // fallback to 404 if no match
  };
}

export default Route