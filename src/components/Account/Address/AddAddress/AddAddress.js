import { useState } from "react";
import { Button } from "semantic-ui-react";
import { BasicModal } from "@/components/Shared";
import styles from "./AddAddress.module.scss";
import { AddressForm } from "../AddressForm";

// Creamos un boton para abrir el modal donde pondremos la direccion
export function AddAddress(props) {
  const { onReload } = props;
  const [show, setShow] = useState(false);
  // console.log(show);

  const onOpenClose = () => setShow((prevState) => !prevState);

  return (
    <>
      <Button primary className={styles.addBtn} onClick={onOpenClose}>
        Crear
      </Button>

      <BasicModal show={show} onClose={onOpenClose} title="Nueva dirección">
        <AddressForm onClose={onOpenClose} onReload={onReload} />
      </BasicModal>
    </>
  );
}
