import { useState } from 'react'
import Head from 'next/head';
import Image from 'next/image';
import React from 'react'
import { storeApi } from '../utils/storeApi'


const SingleProduct = ({ product }) => {

    const variantId = product.variants.edges[0].node.id
    const [loading, setLoading] = useState(false);


    const checkout = async () => {
        setLoading(true);
        const { data } = await storeApi(checkoutMutation, { variantId })
        const { webUrl } = data.checkoutCreate.checkout
        window.location.href = webUrl
        setLoading(false);
    }

    return (
        <>
            <Head>
                <title>Shopify | {product.title}</title>
            </Head>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <Image
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src={product.images.edges[0].node.url}
                            alt={product.title}
                            width={500} height={500}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {product.title}
                            </h1>
                            <p className="leading-relaxed">{product.description}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Color</span>
                                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" />
                                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" />
                                    <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none" />
                                </div>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">
                                    ${product.priceRange.minVariantPrice.amount}
                                </span>
                                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                                    onClick={checkout}
                                >
                                    {loading ? 'Loading...' : 'Buy Now'}
                                </button>
                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg
                                        fill="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleProduct


const gql = String.raw
// mutation for the checkout
const checkoutMutation = gql`
mutation CheckoutCreate($variantId: ID!){
  checkoutCreate(input:{
    lineItems: {
      variantId: $variantId
      quantity:1
    }
  }){
    checkout{
      webUrl
    }
  }
}

`