import Navb from '../components/Navb'
import { CartStateProvider } from '../lib/cartState'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CartStateProvider>
        <Navb />
        <Component {...pageProps} />
      </CartStateProvider>
    </>
  )
}

export default MyApp
