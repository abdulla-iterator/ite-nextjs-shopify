import SingleProduct from '../../components/SingleProduct'

const Product = ({ ProductId }) => {


    return (
        <div><SingleProduct ProductId={ProductId} /></div>
    )
}

export default Product


// Product.getInitialProps = async ({ query }) => {
//     const { id } = query

//     return { id }
// }

export async function getServerSideProps({ params: { id } }) {
    const data = await id


    return {
        props: {
            ProductId: data
        }
    }
}