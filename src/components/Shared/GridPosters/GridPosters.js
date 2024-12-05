import styles from "./GridPosters.module.scss";
import Link from "next/link";
import { map } from "lodash";
import { fn, ENV } from "@/utils";
import { Label } from "@/components/Shared";

export function GridPosters(props) {
  const { posters } = props;
  // console.log(posters);

  const enlaceStrapi = `${ENV.SERVER_HOST}`;

  return (
    <div className={styles.gridPosters}>
      {map(posters, (poster) => (
        <Link
          key={poster.id}
          href={`/${poster.slug}`}
          className={styles.poster}
        >
          <div>
            <img src={`${enlaceStrapi}${poster.cover.url}`} />
            {poster.discount > 0 && (
              <Label.Discount className={styles.discount}>
                {`-${poster.discount}%`}
              </Label.Discount>
            )}
          </div>

          <div>
            <span>{poster.name}</span>
            <span className={styles.price}>
              {fn.calcDiscountedPrice(poster.price, poster.discount)}€
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
