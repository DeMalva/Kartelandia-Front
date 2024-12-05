import { useState, useEffect, createContext } from "react";
import { Cart } from "@/api";

//Creamos el contexto para el carrito de compras

const cartCtrl = new Cart();

export const CartContext = createContext();

export function CartProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(cartCtrl.count());

  // Con esta funcion obtenemos el carrito
  useEffect(() => {
    const response = cartCtrl.getAll();
    setCart(response);
  }, []);

  const addCart = (posterId) => {
    cartCtrl.add(posterId);
    refreshTotalCart();
  };

  const changeQuantityItem = (posterId, quantity) => {
    cartCtrl.changeQuantity(posterId, quantity);
    refreshTotalCart();
  };

  const deleteItem = (posterId) => {
    cartCtrl.delete(posterId);
    refreshTotalCart();
  };

  const deleteAllItems = () => {
    cartCtrl.deleteAll();
    refreshTotalCart();
  };

  // Logica para refrescsar el icono de carrito
  const refreshTotalCart = () => {
    setTotal(cartCtrl.count());
    setCart(cartCtrl.getAll());
  };

  const data = {
    cart,
    addCart,
    total,
    deleteItem,
    deleteAllItems,
    changeQuantityItem,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
