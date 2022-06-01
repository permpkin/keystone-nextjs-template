import Head from "next/head"
// import Image from "next/image"
// import Link from "next/link"

function Error() {
  return (
    <>
      <Head>
        <title>404: Page Not Found</title>
      </Head>
      <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            {/* <Link href="/" className="inline-flex">
              <>
                <span className="sr-only">Workflow</span>
                <Image
                  className="h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </>
            </Link> */}
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">404 error</p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found.</h1>
              <div className="mt-6">
                {/* <Link href="/" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                  <>
                    Go back home<span aria-hidden="true"> &rarr;</span>
                  </>
                </Link> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Error