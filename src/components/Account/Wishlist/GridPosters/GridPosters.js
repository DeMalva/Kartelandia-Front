import styles from "./GridPosters.module.scss";
import Link from "next/link";
import { map } from "lodash";
import { Label, WishlistIcon } from "@/components/Shared";
import { fn } from "@/utils";
import { ENV } from "@/utils/constants";

export function GridPosters(props) {
  const { wishlist, onReload } = props;

  return (
    <div className={styles.gridPosters}>
      {map(wishlist, (item) => {
        const poster = item.poster;
        const cover = poster.cover;
        // console.log(poster);

        return (
          <div key={item.id} className={styles.poster}>
            <Link href={`/${poster.slug}`}>
              <div>
                <img src={`${ENV.SERVER_HOST}${cover.url}`} />

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

            <WishlistIcon
              posterId={poster.id}
              className={styles.whislistIcon}
              removeCallback={onReload}
            />
          </div>
        );
      })}
    </div>
  );
}
