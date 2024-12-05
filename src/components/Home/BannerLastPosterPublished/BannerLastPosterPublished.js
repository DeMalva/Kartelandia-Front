import { useState, useEffect } from "react";
import { Container, Image } from "semantic-ui-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { Poster } from "@/api";
import { Label } from "@/components/Shared";
import { fn } from "@/utils";
import styles from "./BannerLastPosterPublished.module.scss";
import { ENV } from "@/utils";

const posterCtrl = new Poster();

// Vamos a pintar la home con el ultimo poster que hemos publicado
export function BannerLastPosterPublished() {
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await posterCtrl.getLastPublished();
        setPoster(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!poster) return null;

  const wallpaper = poster.wallpaper;
  const enlaceStrapi = `${ENV.SERVER_HOST}`; //Variable para recoger la imagen del host
  //console.log(poster);

  const price = fn.calcDiscountedPrice(poster.price, poster.discount);

  return (
    <div className={styles.container}>
      <Image
        src={`${enlaceStrapi}${wallpaper.url}`}
        className={styles.wallpaper}
      />

      <Link className={styles.infoContainer} href={poster.slug}>
        <Container>
          <span className={styles.date}>
            {poster.release}
            {/* {DateTime.fromISO(releaseDate).minus({ days: 1 }).toRelative()} */}
          </span>

          <h2>{poster.name}</h2>

          <p className={styles.price}>
            <span className={styles.labelDiscount}>-{poster.discount}%</span>
            {/* <Label.Discount>-{poster.discount}%</Label.Discount> */}
            {<span className={styles.finalPrice}>{price}€</span>}
          </p>
        </Container>
      </Link>
    </div>
  );
}
