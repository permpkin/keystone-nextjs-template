import Head from 'next/head'
import { Fragment } from 'react'

import Footer from '@/components/Footer/'
import Header from '@/components/Header/'

import { DocumentRenderer } from '@keystone-6/document-renderer';
import { InferRenderersForComponentBlocks } from '@keystone-6/fields-document/component-blocks';
import { componentBlocks } from '../blocks/componentBlocks';

type ValueOf<T> = T[keyof T];

const objectMap = (obj: typeof componentBlocks, fn: Function) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  )

const componentBlockRegister: any = objectMap(componentBlocks, (componentBlock: ValueOf<typeof componentBlocks>) => {
  return require(`../blocks/${componentBlock.label}/view.tsx`).default
})

const componentBlockRenderers: InferRenderersForComponentBlocks<typeof componentBlocks> = componentBlockRegister

export interface BlockLayoutProps {
  title: string,
  description: string,
  document: any
}

export type BlockProps = Array<{ type: string, props?: any }>

export const PageBlocksLayout = ({
  title,
  description,
  document
}: BlockLayoutProps) => {

  return (
    <Fragment>
      <Head>
        <title key="title">{title}</title>
        <meta property="og:title" content={title} key="og-title" />
        <meta name="description" content={description} key="description"/>
      </Head>
      <Header />
      <main>
        <DocumentRenderer document={document} componentBlocks={componentBlockRenderers} />
      </main>
      <Footer />
    </Fragment>
  )

}