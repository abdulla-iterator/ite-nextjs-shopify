import React from 'react'
import Products from '../components/Products'
import { storeApi } from '../utils/storeApi';


const productsList = ({ products }) => {
    console.log(products);
    return (
        <><Products products={products} /></>
    )
}

export default productsList

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