import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { storeApi } from '../../utils/storeApi';
import { useCart } from '../../lib/cartState';

const gql = String.raw
const createCartMutation = gql`
 mutation createCart($input: CartInput){
  cartCreate(input: $input) {
      cart {
        id
      }
    }
  }
`

const updateCartMutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
      }
    }
  `

const SingleCollection = ({ Collection }) => {

  console.log(Collection);
  const CollectionApi = Collection.products.edges

  const [loading, setLoading] = useState(false);
  const { quantity, openCart } = useCart()


  const AddToCart = async (id) => {
    console.log('adddddddddddddd');
    setLoading(true);
    let cartId = localStorage.getItem('cartId')
    console.log(cartId)

    if (cartId) {
      const variables = {
        cartId,
        lines: {
          quantity: parseInt(quantity),
          merchandiseId: id
        },
      }

      const data = await storeApi(updateCartMutation, variables)
      console.log('updating cart', data);
    } else {
      const variables = {
        input: {
          lines: {
            quantity: parseInt(quantity),
            merchandiseId: id
          },
        },
      }

      const { data } = await storeApi(createCartMutation, variables)
      // console.log(data.cartCreate.cart.id);
      let cartId = data.cartCreate.cart.id
      console.log(cartId);
      localStorage.setItem('cartId', cartId)
    }
    setLoading(false);
    openCart()
  }



  return (
    <>
      <Head>
        <title>Shopify | {Collection.title}</title>
      </Head>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl mb-4 font-extrabold tracking-tight text-gray-900">{Collection.title}</h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {CollectionApi.map((item) => {
              const product = item.node
              const image = product.images.edges[0].node
              return (
                <div key={product.handle} href={`/product/${product.handle}`}>
                  <a className="group">
                    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                      <Image
                        src={image.url}
                        alt={product.title}
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                        layout='fill'
                      />
                    </div>
                    <Link href={`/product/${product.handle}`}>
                      <a>
                        <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                      </a>
                    </Link>
                    <p className="mt-1 text-lg font-medium text-gray-900">$ {product.priceRange.minVariantPrice.amount}</p>
                  </a>
                  <button onClick={() => AddToCart(item.node.variants.edges[0].node.id)} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    {loading ? 'Adding to Cart' : 'Add to Cart'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleCollection;



export async function getServerSideProps({ params: { handle } }) {
  const { data } = await storeApi(singleCollectionQuery, { handle })

  return {
    props: {
      Collection: data?.collection
    }
  }
}



// query for single collection products 
const singleCollectionQuery = gql`
query singleCollection($handle: String!){
  collection(handle: $handle){
    title
    products(first:10){
      edges{
        node{
          title
          handle
          variants(first:1){
          edges{
            node{
              id
            }
          }
        }
          priceRange{
            minVariantPrice{
              amount
            }
          }
          images(first:1){
            edges{
              node{
                url
              }
            }
          }
        }
      }
    }
  }
}
`