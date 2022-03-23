import Head from 'next/head';
import Image from 'next/image';
import React from 'react'
import ProductApi from '../utils/ProductApi';

const SingleProduct = ({ ProductId }) => {
    console.log(ProductId);

    const data = ProductApi.find((item) => parseInt(ProductId) === item.id)
    console.log(data);


    return (
        <>
            <Head>
                <title>Shopify</title>
            </Head>
            <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                    <Image
                        src={data.imageSrc}
                        alt={data.imageAlt}
                        className="w-full h-full object-center object-cover"
                        layout='fill'
                    />
                </div>
            </div>
            <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-rows-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{data.name}</h1>
                </div>
                <div className="mt-4 lg:mt lg:row-span-3">
                    <h2 className="not-sr-only">Product information</h2>
                    <p className="text-3xl text-gray-900">Price: {data.price}</p>
                </div>
            </div>
        </>
    )
}

export default SingleProduct