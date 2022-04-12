import React from 'react'
import Head from 'next/head'
import Products from '../components/Products'
import { storeApi } from '../utils/storeApi';
import { productsQuery } from '../src/query';


const ProductsList = ({ products }) => {

  return (
    <>
      <Head>
        <title>Shopify | Products</title>
      </Head>
      <Products products={products} />

    </>
  )
}

export default ProductsList

export async function getStaticProps() {
  const { data } = await storeApi(productsQuery)

  return {
    props: {
      products: data.products
    }
  }
}
