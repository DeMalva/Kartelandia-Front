import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Poster } from "@/api";
import { CartLayout } from "@/layouts";
import { useCart } from "@/hooks";
import { Cart } from "@/components/Cart";
import { Seo } from "@/components/Shared";

const posterCtrl = new Poster();

// Esta es la pagina donde renderizamos el carrito segun el paso donde estemos
// Traemos los productos del carro y luego los identificamos
// El useEffect se encarga de pedir los datos
export default function CartPage() {
  const {
    query: { step = 1 },
  } = useRouter();
  const currentStep = Number(step);
  const [posters, setPosters] = useState(null);
  const { cart } = useCart();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const data = [];
  //       for await (const item of cart) {
  //         const response = await posterCtrl.getPosterById(item.id);
  //         data.push({ ...response.data, quantity: item.quantity });
  //         console.log(item);
  //       }
  //       setPosters(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, [cart]);
  useEffect(() => {
    (async () => {
      try {
        const data = [];
        if (cart) {
          for await (const item of cart) {
            const response = await posterCtrl.getPosterById(item.id);
            data.push({ ...response, quantity: item.quantity });
          }
          console.log(data);

          setPosters(data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [cart]);

  return (
    <>
      <Seo title="Carrito de compra" />

      <CartLayout>
        {currentStep === 1 && <Cart.StepOne posters={posters} />}
        {currentStep === 2 && <Cart.StepTwo posters={posters} />}
        {currentStep === 3 && <Cart.StepThree />}
      </CartLayout>
    </>
  );
}
