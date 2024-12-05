import { useState } from "react";
import { Image } from "semantic-ui-react";
import { DateTime } from "luxon";
import { forEach, map } from "lodash";
import { BasicModal } from "@/components/Shared";
import { fn } from "@/utils";
import styles from "./Order.module.scss";
import { ENV } from "@/utils/constants";

export function Order(props) {
  const { order } = props;
  //Saber si el modal esta abierto o cerrado
  const [showModal, setShowModal] = useState(false);

  // Vamos a formatear la fecha para que aparezca de forma entendible
  const createdAt = new Date(order.createdAt).toISOString();
  const products = order.products;
  const address = order.addressShipping;
  //   console.log(address);
  // console.log(products);

  const openCloseModal = () => setShowModal((prevState) => !prevState);

  const getTotalProducts = () => {
    let total = 0;

    forEach(products, (product) => {
      total += product.quantity;
    });

    return total;
  };

  return (
    <>
      <div className={styles.order} onClick={openCloseModal}>
        <div>
          <span>
            {DateTime.fromISO(createdAt, { locale: "es" }).toFormat(
              "dd/MM/yyyy"
            )}
          </span>
          <p>{getTotalProducts()} productos</p>
        </div>

        <p>{order.total.toFixed(2)}€</p>
      </div>

      <BasicModal
        show={showModal}
        onClose={openCloseModal}
        title="Información del pedido"
      >
        {map(products, (product) => (
          <div className={styles.product}>
            <Image src={`${ENV.SERVER_HOST}${product.cover.url}`} />

            <div>
              <div className={styles.info}>
                <div>
                  <p>{product.name}</p>
                  <p>{product.category.name}</p>
                </div>
              </div>
              <div className={styles.quantity}>
                <span>x{product.quantity}</span>
                <span>
                  {fn.calcDiscountedPrice(product.price, product.discount)}€
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.address}>
          <div>
            <p className={styles.title}>{address.title}</p>
            <p className={styles.addressInfo}>
              {address.name}, {address.address}, {address.state}, {address.city}
              , {address.postal_code}
            </p>
          </div>
        </div>

        <div className={styles.total}>
          <p>TOTAL: {order.total.toFixed(2)}€</p>
        </div>
      </BasicModal>
    </>
  );
}
