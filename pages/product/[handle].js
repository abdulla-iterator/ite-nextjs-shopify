import SingleProduct from '../../components/SingleProduct'
import { storeApi } from '../../utils/storeApi'
import { singleProductQuery } from '../../src/query'

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

