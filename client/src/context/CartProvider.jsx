import { createContext, React, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
const cartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    // const x = ;
    let existingCart = localStorage.getItem(`cart_${auth?.user?._id}`);
    // console.log(`cart_${auth?.user?._id}`);
    if (existingCart) {
      setCart(JSON.parse(existingCart));
    }
  }, [auth.user?._id]);
  //set default header for any axios request

  // axios.defaults.headers.common["Authorization"] = auth?.token;

  return (
    <cartContext.Provider value={[cart, setCart]}>
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
// custom hook
const useCart = () => useContext(cartContext);
export { useCart };
