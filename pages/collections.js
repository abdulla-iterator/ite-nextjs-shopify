import React from 'react';
import Head from 'next/head'
import Collections from '../components/Collections'
import { storeApi } from '../utils/storeApi'
import { collectionsQuery } from '../src/query';

const CollectionsList = ({ collections }) => {

  return (
    <div>
      <Head>
        <title>Shopify | Collections</title>
      </Head>
      <Collections collections={collections} />

    </div>
  )
}

export default CollectionsList

export async function getStaticProps() {
  const { data } = await storeApi(collectionsQuery)

  return {
    props: {
      collections: data.collections
    }
  }
}


