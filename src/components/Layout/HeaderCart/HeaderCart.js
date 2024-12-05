import { Icon, Image } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { map } from "lodash";
import classNames from "classnames";
import styles from "./HeaderCart.module.scss";

// En el Header de el carrito colocaremos un check de compra a medida que se
// completen los pasos de compra

export function HeaderCart() {
  // funcion para que el paso por defecto sea el 1 y este marcado
  const {
    query: { step = 1 },
  } = useRouter();
  const currentStep = step;

  const steps = [
    { number: 1, title: "Cesta" },
    { number: 2, title: "Pago" },
    { number: 3, title: "Confirmación" },
  ];

  return (
    // Insertamos el logo, los pasos  y los iconos de la parte izqauierda
    // Mapeamos los pasos y le damos una logica para que sigan una progresion
    <div className={styles.headerCart}>
      <div className={styles.left}>
        <Link href="/">
          <Image src="/images/logo.png" alt="Kartelandia" />
        </Link>
      </div>

      <div className={styles.center}>
        {map(steps, (step) => (
          <div
            key={step.number}
            className={classNames({
              [styles.active]: step.number === Number(currentStep),
              [styles.success]: step.number < Number(currentStep),
            })}
          >
            <span className={styles.number}>
              <Icon name="check" />
              {step.number}
            </span>
            <span>{step.title}</span>
            <span className={styles.space} />
          </div>
        ))}
      </div>

      <div className={styles.right}>
        <Icon name="lock" />
        <div>
          <span>Pago seguro</span>
          <span>256-bit SSL Secure</span>
        </div>
      </div>
    </div>
  );
}
