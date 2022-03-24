import Head from 'next/head'
import Products from '../components/Products'
import { storeApi } from '../utils/storeApi'

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

// query for the first 8 products in home page
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
