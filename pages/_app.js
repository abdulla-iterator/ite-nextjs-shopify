import Navbar from '../components/Navbar'
import { CartStateProvider } from '../lib/cartState'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CartStateProvider>
        <Navbar />
        <Component {...pageProps} />
      </CartStateProvider>
    </>
  )
}

export default MyApp
