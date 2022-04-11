import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useCart } from '../lib/cartState';
import { storeApi } from '../utils/storeApi';

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

const Products = ({ products }) => {
    const ProductApi = products?.edges
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
        <div className="bg-white z-0 top-20 ">
            <div className="max-w-2xl z-0 mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl mb-4 font-extrabold tracking-tight text-gray-900">Customers Favorites</h2>

                <div className="grid z-0 grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {ProductApi.map((item) => {
                        console.log("cart id adfsfsfsadfa", item);
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
                                    <p className="mt-1 text-lg font-medium text-gray-900">₹ {product.priceRange.minVariantPrice.amount}</p>
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
    )
}

export default Products;

