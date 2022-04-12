import Footer from '../components/Footer'
import Router from 'next/router';
import Navbar from '../components/Navbar'
import { CartStateProvider } from '../lib/cartState'
import NProgress from 'nprogress'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false })

  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  })

  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  })
  return (
    <>
      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==' crossOrigin='anonymous' referrerPolicy='no-referrer' />
      <CartStateProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </CartStateProvider>
    </>
  )
}

export default MyApp
