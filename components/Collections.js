import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Collections = ({ collections }) => {
    const CollectionsApi = collections.edges

    return (
        <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
                    <h2 className="text-2xl font-extrabold text-gray-900">Collections</h2>

                    <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                        {CollectionsApi.map((item) => (
                            <div key={item.node.id} className="group relative">
                                <>
                                    <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                        <Image
                                            src={item.node.image?.url}
                                            alt={item.node.title}
                                            className="w-full h-full object-center object-cover"
                                            layout='fill'
                                        />
                                    </div>
                                    <Link href={`/collection/${item.node.handle}`} className="mt-6 text-sm text-gray-500">
                                        <a >
                                            <span className="absolute inset-0" />
                                            {item.node.title}
                                        </a>
                                    </Link>
                                    <p className="text-base font-semibold text-gray-900">{item.node.description}</p>
                                </>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collections