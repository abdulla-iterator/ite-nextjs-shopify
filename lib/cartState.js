import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider

const CartStateProvider = ({ children }) => {
    //local storage for state and functionality for children components


    const [cartData, setCartData] = useState({});
    const [quantity, setQuantity] = useState(1)
    const [customerDetails, setCustomerDetails] = useState({});

    const [open, setOpen] = useState(false);

    function capitalize(str) {
        return str?.charAt(0)?.toUpperCase() + str?.slice(1);
    }

    const toggleCart = () => (
        setOpen(!open)
    )
    const closeCart = () => (
        setOpen(false)
    )
    const openCart = () => (
        setOpen(true)
    )

    return (
        <LocalStateProvider value={{ capitalize, quantity, customerDetails, setCustomerDetails, setQuantity, open, toggleCart, closeCart, openCart, setCartData, cartData }}>
            {children}
        </LocalStateProvider>
    );
};

//custom Hook to access local state
const useCart = () => {
    const all = useContext(LocalStateContext);
    return all;
}

export { CartStateProvider, useCart }
