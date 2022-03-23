import Head from 'next/head'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import { storeApi } from '../utils/storeApi'

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Shopify</title>
      </Head>
      <Navbar />
      <Products products={products} />

    </>
  )
}

export async function getStaticProps() {
  const { data } = await storeApi(productsQuery)
  console.log(data);
  return {
    props: {
      products: data.products
    }
  }
}
const gql = String.raw
const productsQuery = gql`
query products{
products(first: 8) {
  edges {
    node {
      title
      handle
      priceRange{
        minVariantPrice{
          amount
        }
      }
      images(first:1){
        edges{
          node{
            url
            altText
            
          }
        }
      }
    }
  }
}
}

  
  `
