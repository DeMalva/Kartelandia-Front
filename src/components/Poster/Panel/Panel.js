import styles from "./Panel.module.scss";
import { Button, Container, Icon, Image } from "semantic-ui-react";
import { fn } from "@/utils";
import { ENV } from "@/utils";
import { useState } from "react";
import { useCart, useAuth } from "@/hooks";
import { WishlistIcon } from "@/components/Shared";
import { useRouter } from "next/router";

// Vamos a desarrollar la pagina de cada producto con su precio y su descuento
export function Panel(props) {
  const { posterId, poster } = props;
  const { addCart } = useCart();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const goToLogin = () => router.push("/join/sign-in");

  const coverUrlStrapi = `${ENV.SERVER_HOST}${poster.cover.url}`;
  const buyPrice = fn.calcDiscountedPrice(poster.price, poster.discount);
  // console.log(props);

  // Funcion para añadir poster a el carrito con un timeout para apreciar el efecto
  const addCartWrapper = () => {
    setLoading(true);
    addCart(posterId);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Container className={styles.panel}>
      <div className={styles.imgContiner}>
        <Image src={coverUrlStrapi} />
      </div>

      <div className={styles.actionsContainer}>
        <div>
          <h2>{poster.name}</h2>

          <div className={styles.moreInfo}>
            <span>{poster.category.name}</span>
            <span>
              <Icon name="check" />
              En stock
            </span>
          </div>

          <div className={styles.price}>
            {poster.discount > 0 && (
              <>
                <span className={styles.originalPrice}>
                  <Icon name="tag" />
                  {poster.price}€
                </span>

                <span className={styles.discount}>-{poster.discount}%</span>
              </>
            )}

            <span className={styles.price}>{buyPrice}€</span>
          </div>
          {/* <Button primary fluid onClick={addCartWrapper} */}
          <Button
            primary
            fluid
            onClick={!user ? goToLogin : addCartWrapper}
            loading={loading}
          >
            Comprar ahora
          </Button>

          <WishlistIcon posterId={posterId} className={styles.heart} />
        </div>
      </div>
    </Container>
  );
}
