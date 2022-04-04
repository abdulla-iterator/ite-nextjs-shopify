import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider

const CartStateProvider = ({ children }) => {
    //local storage for state and functionality for children components


    const [cartData, setCartData] = useState({});
    const [quantity, setQuantity] = useState(1)

    const [open, setOpen] = useState(false);



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
        <LocalStateProvider value={{ quantity, setQuantity, open, toggleCart, closeCart, openCart, setCartData, cartData }}>
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
