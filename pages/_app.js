import Footer from '../components/Footer'
import Navb from '../components/Navb'
import { CartStateProvider } from '../lib/cartState'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CartStateProvider>
        <Navb />
        <Component {...pageProps} />
        <Footer />
      </CartStateProvider>
    </>
  )
}

export default MyApp
