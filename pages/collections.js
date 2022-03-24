import React from 'react';
import Head from 'next/head'
import Collections from '../components/Collections'
import { storeApi } from '../utils/storeApi'

const collections = ({ collections }) => {

    return (
        <div>
            <Head>
                <title>Shopify | Collections</title>
            </Head>
            <Collections collections={collections} />

        </div>
    )
}

export default collections

export async function getStaticProps() {
    const { data } = await storeApi(collectionsQuery)

    return {
        props: {
            collections: data.collections
        }
    }
}


const gql = String.raw
// query to fetch all collections 
const collectionsQuery = gql`
query collections{
  collections(first:10){
    edges{
      node{
        id
        handle
        title
        description
        image{
          url
        }
      }
    }
  }
}

`