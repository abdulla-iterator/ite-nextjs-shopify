const gql = String.raw

export const productsQuery = gql`
  query products{
  products(first: 20) {
    edges {
      node {
        title
        handle
        variants(first:1){
          edges{
            node{
              id
            }
          }
        }
        priceRange{
          minVariantPrice{
            amount
          }
        }
        images(first:1){
          edges{
            node{
              url
              altText
              
            }
          }
        }
      }
    }
  }
}

    
    `
export const singleProductQuery = gql`
query SingleProduct($handle: String!){
    productByHandle(handle: $handle){
      id
      title
      description
      updatedAt
      tags
      priceRange{
        minVariantPrice{
          amount
        }
      }
      images(first:1){
        edges{
          node{
            url
            altText
          }
        }
      }
      variants(first:1){
        edges{
          node{
            id
          }
        }
      }
    }
  }
  
      
      `

export const collectionsQuery = gql`
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

export const singleCollectionQuery = gql`
query singleCollection($handle: String!){
  collection(handle: $handle){
    title
    products(first:10){
      edges{
        node{
          title
          handle
          variants(first:1){
          edges{
            node{
              id
            }
          }
        }
          priceRange{
            minVariantPrice{
              amount
            }
          }
          images(first:1){
            edges{
              node{
                url
              }
            }
          }
        }
      }
    }
  }
}
`

export const Customer = gql`
query customer($customerAccessToken: String!){
  customer(customerAccessToken: $customerAccessToken){
    email
    displayName
  }
}
`
export const getCartQuery = gql`
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