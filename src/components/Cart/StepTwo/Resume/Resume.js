import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { forEach, map } from "lodash";
import { Cart } from "@/api";
import { useAuth, useCart } from "@/hooks";
import { fn } from "@/utils";
import styles from "./Resume.module.scss";

const cartCtrl = new Cart();

export function Resume(props) {
  const { posters, addressSelected } = props;
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { deleteAllItems } = useCart();
  const router = useRouter();

  // CAlculamos el precio total, si posters cambia, actualizamos
  useEffect(() => {
    let totalTemp = 0;

    forEach(posters, (poster) => {
      const price = fn.calcDiscountedPrice(poster.price, poster.discount);
      totalTemp += price * poster.quantity;
    });

    setTotal(totalTemp.toFixed(2));
  }, [posters]);

  //Logica de el pago por Stripe
  const onPay = async () => {
    setLoading(true);
    // Comprobamos que Stripe y elemnt se han cargado
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);

    if (result.error) {
      console.error(result.error.message);
      window.alert(result.error.message);
    } else {
      const response = await cartCtrl.paymentCart(
        result.token,
        posters,
        user.id,
        addressSelected
      );

      if (response.status === 200) {
        deleteAllItems();
        goToStepEnd();
        setLoading(false);
      } else {
        console.error("Error al realizar el pedido");
      }
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const goToStepEnd = () => {
    router.replace({ query: { ...router.query, step: 3 } });
  };

  if (!total) return null;

  return (
    <div className={styles.resume}>
      <h2>Resumen</h2>

      <div className={styles.block}>
        <div className={styles.products}>
          {map(posters, (poster) => (
            <div key={poster.id} className={styles.product}>
              <div>
                <p>{poster.name}</p>
                <span>{poster.category.name}</span>
              </div>
              <span>
                {poster.quantity > 0 && `${poster.quantity}x`}
                {fn.calcDiscountedPrice(poster.price, poster.discount)}€
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.blockTotal}>
        <div>
          <span>Total</span>
          <span>{total}€</span>
        </div>

        <Button
          primary
          fluid
          // Si el usuario no ha seleccionado  una direccion no puede pagar
          disabled={!addressSelected}
          onClick={onPay}
          loading={loading}
        >
          Pagar
        </Button>
      </div>
    </div>
  );
}
