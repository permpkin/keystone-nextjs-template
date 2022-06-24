import Head from 'next/head'
import { Fragment } from 'react'

import Footer from '@/components/Footer/'
import Header from '@/components/Header/'
import { PageBlocks } from '@/components/PageBlocks'

export interface BlockLayoutProps {
  pages?: Array<{ title: string, path: string }>
  title: string
  description: string
  blocks: BlockProps
}

export type BlockProps = Array<{ type: string, props?: any }>

export const PageBlocksLayout = ({
  pages,
  title,
  description,
  blocks
}: BlockLayoutProps) => {

  return (
    <Fragment>
      <Head>
        <title key="title">{title}</title>
        <meta property="og:title" content={title} key="og-title" />
        <meta name="description" content={description} key="description"/>
      </Head>
      <Header pages={pages} />
      <main>
        <PageBlocks blocks={blocks}/>
      </main>
      <Footer />
    </Fragment>
  )

}