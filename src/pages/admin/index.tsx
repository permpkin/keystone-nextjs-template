// import { Navigation } from '@/components/admin/Navigation';
import type {
  NextPage,
  GetStaticProps
} from 'next'
import Head from 'next/head'
// import { createStyles, Anchor, Group, ActionIcon } from '@mantine/core';
// import { BrandTwitter, BrandYoutube, BrandInstagram } from 'tabler-icons-react';

// import api from '.keystone/api';
import { Fragment } from 'react'
// import dynamic from 'next/dynamic'

const PageMatch: NextPage = ({ /** */ }: any) => {
  
  const PageTitle = `Admin`;

  return (
    <Fragment>
      <Head>
        <title key="title">{PageTitle}</title>
      </Head>
      <main>
        admin area
      </main>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  
  return {
    props: {
      //
    }
  }

}

export default PageMatch