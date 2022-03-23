/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'shopto12.myshopify.com', 'cdn.shopify.com'],
  }
}

module.exports = nextConfig
