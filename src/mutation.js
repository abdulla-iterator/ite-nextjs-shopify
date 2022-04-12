const gql = String.raw

export const createCartMutation = gql`
 mutation createCart($input: CartInput){
  cartCreate(input: $input) {
      cart {
        id
      }
    }
  }
`

export const updateCartMutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
      }
    }
  `

export const removeItemMutation = gql`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
      }
    }
  }
`

export const increaseQuantityMutation = gql`
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart{
                id
                estimatedCost{
                    subtotalAmount{
                        amount
                    }
                }
                lines(first:10){
                    edges{
                        node{
                            id
                            quantity
                        }
                    }
                }
            }
    }
}
`

export const CustomerLogin = gql`
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      # CustomerUserError fields
      message
    }
  }
}
`
export const customerRecovery = gql`
mutation customerRecover($email: String!){
  customerRecover(email: $email){
    customerUserErrors{
      message
    }
  }
}
`

export const CustomerCreate = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        firstName
        lastName
        email
        phone
      }
      customerUserErrors {
        message
      }
    }
  }
`;

