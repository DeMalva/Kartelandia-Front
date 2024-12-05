import { useState, useEffect } from "react";
import { map } from "lodash";
import styles from "./ListAddresses.module.scss";
import { Address as AddressCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { Address } from "./Address";

const addressCtrl = new AddressCtrl();

export function ListAddresses(props) {
  const { reload, onReload } = props;
  const [addresses, setAddresses] = useState(null);
  const { user } = useAuth();

  // Usamos reload para que el useEffect este pendiente de cualquier cambio de estado
  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll(user.id);
        console.log(response);

        setAddresses(response.data);

        //Guardamos direcciones en nuestro estado
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  if (!addresses) return null;

  return (
    <div className={styles.addresses}>
      {map(addresses, (address) => (
        <Address
          key={address.id}
          addressId={address.documentId}
          address={address}
          onReload={onReload}
        />
      ))}
    </div>
  );
}
