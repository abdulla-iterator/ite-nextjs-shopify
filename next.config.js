/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'www.floatui.com', 'shopto12.myshopify.com', 'cdn.shopify.com', 'floatui.com', 'tuk-cdn.s3.amazonaws.com'],
  }
}

module.exports = nextConfig
