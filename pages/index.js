import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Shopify</title>
      </Head>
      <Navbar />
      <Products />

    </>
  )
}
