import { Icon, Image, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import { fn } from "@/utils";
import { useCart } from "@/hooks";
import styles from "./Basket.module.scss";
import { ENV } from "@/utils";

export function Basket(props) {
  const { posters } = props;

  const enlaceStrapi = `${ENV.SERVER_HOST}`;

  const { changeQuantityItem, deleteItem } = useCart();

  const options = Array.from({ length: 50 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: String(number), value: number };
  });

  return (
    <div className={styles.basket}>
      <h2>Cesta</h2>

      <div className={styles.block}>
        {map(posters, (poster) => (
          <div key={poster.id} className={styles.product}>
            <Image src={`${enlaceStrapi}${poster.cover.url}`} />
            <div>
              <div className={styles.info}>
                <div>
                  <p>{poster.name}</p>
                  <p>{poster.category.name}</p>
                </div>

                <Icon
                  name="trash alternate outline"
                  link
                  onClick={() => deleteItem(poster.id)}
                />
              </div>

              <div className={styles.quantity}>
                <Dropdown
                  className="number"
                  options={options}
                  selection
                  value={poster.quantity}
                  compact
                  onChange={(_, data) =>
                    changeQuantityItem(poster.id, data.value)
                  }
                />
                <span>
                  {fn.calcDiscountedPrice(poster.price, poster.discount)}€
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
