import React from 'react'
import Head from 'next/head'
import Products from '../components/Products'
import { storeApi } from '../utils/storeApi';


const productsList = ({ products }) => {

  return (
    <>
      <Head>
        <title>Shopify | Products</title>
      </Head>
      <Products products={products} />

    </>
  )
}

export default productsList

export async function getStaticProps() {
  const { data } = await storeApi(productsQuery)

  return {
    props: {
      products: data.products
    }
  }
}

// query for the all the products which is in this case 20
const gql = String.raw

const productsQuery = gql`
  query products{
  products(first: 20) {
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