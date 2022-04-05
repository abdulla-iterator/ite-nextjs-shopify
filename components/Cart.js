/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useCart } from '../lib/cartState'
import { storeApi } from '../utils/storeApi';
import { useEffect, useState } from 'react';



const gql = String.raw

const getCartQuery = gql`
query getCart($Id: ID!){
  cart(id: $Id){
    id
    lines(first:10){
      edges{
        node{
          id
          quantity
          merchandise{
            ... on ProductVariant{
              id
              image{
                url
              }
              priceV2{
                amount
              }
              product{
                id
                title
                handle
                variants(first:10){
                  edges{
                    node{
                      id
                    }
                  }
                }
              }
            }
          }

        }
      }
    }
    checkoutUrl
    estimatedCost{
      subtotalAmount{
        amount
      }
    }
  }
}

`

const removeItemMutation = gql`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
      }
    }
  }
`
const updateCartMutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesAdd(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
        }
      }
    }
  `

const increaseQuantityMutation = gql`
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart{
                id
                estimatedCost{
                    subtotalAmount{
                        amount
                    }
                }
                lines(first:10){
                    edges{
                        node{
                            id
                            quantity
                        }
                    }
                }
            }
    }
}
`


const Cart = () => {
    const { open, openCart, closeCart, cartData, setCartData, } = useCart()
    const [loading, setLoading] = useState(false);



    console.log(cartData);

    useEffect(() => {
        let cartId = localStorage.getItem('cartId')

        if (cartId) {

            const cartDetails = async () => {
                const { data } = await storeApi(getCartQuery, { Id: cartId })
                setCartData(data)
            }
            cartDetails()
        } else {
            setCartData([])
        }
    }, [open])




    const handleRemoveItem = async (cartId, lineId) => {
        setLoading(true)
        const variables = {
            cartId,
            lineIds: [lineId],
        }
        await storeApi(removeItemMutation, variables)
        const { data } = await storeApi(getCartQuery, { Id: cartId })
        setCartData(data)
        setLoading(false)
    }

    const increaseQuantity = async (id, qty) => {
        setLoading(true)
        const variables = {
            cartId: cartData?.cart?.id,
            lines: {
                id,
                quantity: qty + 1,
            },
        }

        await storeApi(increaseQuantityMutation, variables)
        const { data } = await storeApi(getCartQuery, { Id: cartData?.cart?.id })
        setCartData(data)
        setLoading(false)
    }

    const decreaseQuantity = async (id, qty) => {
        setLoading(true)
        const variables = {
            cartId: cartData?.cart?.id,
            lines: {
                id,
                quantity: qty - 1,
            },
        }

        await storeApi(increaseQuantityMutation, variables)
        const { data } = await storeApi(getCartQuery, { Id: cartData?.cart?.id })
        setCartData(data)
        console.log('increased cart', data);
        setLoading(false)
    }



    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={closeCart} >
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="pointer-events-auto w-screen max-w-md">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title className="text-lg font-medium text-gray-900"> Shopping cart {cartData?.cart?.lines.edges.length === 0 && 'is Empty'}</Dialog.Title>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    onClick={closeCart}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    {cartData?.cart?.lines.edges?.map((product) => {
                                                        const image = product?.node.merchandise.image.url
                                                        return (
                                                            <li key={product.node.id} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <Image
                                                                        src={image}
                                                                        alt={product.node.merchandise.product.title}
                                                                        className="h-full w-full object-cover object-center"
                                                                        layout='responsive' width={100} height={100}
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <a href={`/product/${product.node.merchandise.product.handle}`}> {product.node.merchandise.product.title} </a>
                                                                            </h3>
                                                                            <p className="ml-4">₹ {+(product.node.merchandise.priceV2.amount * product.node.quantity).toFixed(5)}</p>
                                                                        </div>
                                                                        {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <p className="text-gray-900 text-base">Qty<button type='button' onClick={() => decreaseQuantity(product.node.id, product.node.quantity)} className="text-xl mx-4" >-</button>{product.node.quantity}<button type='button' onClick={() => increaseQuantity(product.node.id, product.node.quantity)} className=' mx-4 text-lg'>+</button> </p>

                                                                        <div className="flex">
                                                                            <button type="button" onClick={() => handleRemoveItem(cartData?.cart?.id, product?.node?.id)} className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                                {loading ? 'Removing' : 'Remove'}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>₹ {cartData.cart?.estimatedCost.subtotalAmount.amount}</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                        <div className="mt-6">
                                            {cartData?.cart?.lines.edges.length > 0 &&
                                                <a
                                                    href={cartData.cart?.checkoutUrl}
                                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                >
                                                    Checkout
                                                </a>}
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or{' '}
                                                <button
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    onClick={closeCart}
                                                >
                                                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Cart;



