import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Head from "next/head"

function Error() {
  return (
    <>
      <Head>
        <title>404: Page Not Found</title>
      </Head>
      <Header />
      <main>
        <h1>404: Page not found.</h1>
      </main>
      <Footer />
    </>
  )
}

export default Error