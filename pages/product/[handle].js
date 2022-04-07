import SingleProduct from '../../components/SingleProduct'
import { storeApi } from '../../utils/storeApi'

const Product = ({ product }) => {

  return (
    <div><SingleProduct product={product} /></div>
  )
}

export default Product


export async function getServerSideProps({ params: { handle } }) {
  const { data } = await storeApi(singleProductQuery, { handle })
  return {
    props: {
      product: data.productByHandle
    }
  }
}

// query for single product details using unique handle
const gql = String.raw

const singleProductQuery = gql`
query SingleProduct($handle: String!){
  productByHandle(handle: $handle){
    id
    title
    description
    updatedAt
    tags
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
    variants(first:1){
      edges{
        node{
          id
        }
      }
    }
  }
}

    
    `