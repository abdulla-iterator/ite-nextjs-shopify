import Head from 'next/head'
import Products from '../components/Products'
import { storeApi } from '../utils/storeApi'
import { productsQuery } from '../src/query'

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Shopify</title>
      </Head>
      <Products products={products} />
    </>
  )
}



export async function getStaticProps() {
  const { data } = await storeApi(productsQuery)

  return {
    props: {
      products: data.products
    }
  }
}