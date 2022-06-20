import { Html, Head, Main, NextScript } from 'next/document'
import type { WebSite } from 'schema-dts';
import { Schema } from '@/utils/schema'
import config from '../../config'

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" key="main-font" />
        <link rel="icon" href="/favicon.ico" key="icon" />
        <link rel="canonical" href={config.SITE_URL}  key="canonical"/>
        <meta name="description" content={config.SITE_DESCRIPTION} key="description"/>
        <meta property="og:title" content={config.SITE_TITLE} key="og-title" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: Schema<WebSite>({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: config.SITE_TITLE
          })
        }} key="ld-title" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}