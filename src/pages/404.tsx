import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Head from "next/head"
import { css } from '@emotion/css';

export const style = {
  main: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `
};

function Error() {
  return (
    <>
      <Head>
        <title>404: Page Not Found</title>
      </Head>
      <Header />
      <main className={style.main}>
        <h1>404: Page not found.</h1>
      </main>
      <Footer />
    </>
  )
}

export default Error