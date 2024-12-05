import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { forEach } from "lodash";
import { fn } from "@/utils";
import styles from "./Resume.module.scss";

// Creamos la pagina para mostrar el carrito y un boton para pasar al
// segundo paso
export function Resume(props) {
  const { posters } = props;
  const router = useRouter();
  const [totals, setTotals] = useState(null);
  //   console.log(totals);

  useEffect(() => {
    let totals = {
      original: 0,
      discount: 0,
      price: 0,
    };

    forEach(posters, (poster) => {
      // Calculamos cuanto cuesta cada poster con su descuento y el total
      const price = fn.calcDiscountedPrice(poster.price, poster.discount);

      totals = {
        original: totals.original + poster.price * poster.quantity,
        discount: totals.discount + (poster.price - price) * poster.quantity,
        price: totals.price + price * poster.quantity,
      };
    });

    setTotals(totals);
  }, [posters]);

  // Funcion para pasar al segundo paso
  const goToStepTwo = () => {
    router.replace({ query: { ...router.query, step: 2 } });
  };

  if (!totals) return null;

  return (
    <div className={styles.resume}>
      <h2>Resumen</h2>

      <div className={styles.block}>
        <div className={styles.prices}>
          <div>
            <span>Precio oficial</span>
            <span>{totals.original.toFixed(2)}€</span>
          </div>
          <div>
            <span>Descuento</span>
            <span>{totals.discount.toFixed(2)}€</span>
          </div>
          <div>
            <span>Subtotal</span>
            <span>{totals.price.toFixed(2)}€</span>
          </div>
        </div>

        <Button primary fluid onClick={goToStepTwo}>
          Proceder con el pago
        </Button>

        <Link href="/">Continuar comprando</Link>
      </div>
    </div>
  );
}
