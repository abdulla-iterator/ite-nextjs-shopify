

export const storeApi = async (query, variables = {}) => {
    const res = await fetch(process.env.NEXT_PUBLIC_STOREFRONT_PUBLIC_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN
        },
        body: JSON.stringify({ query, variables }),
    })
    return res.json()
}