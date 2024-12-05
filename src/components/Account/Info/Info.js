import { Button, Icon } from "semantic-ui-react";
import { DateTime } from "luxon";
import { useAuth } from "@/hooks";
import styles from "./Info.module.scss";

export function Info() {
  //Recuperamos la informacion del usuario para mostrarla
  const { user } = useAuth();

  return (
    //Usamos la libreria Luxon para formatear la fecha que nos llega del servidor
    <div className={styles.info}>
      <Button icon className={styles.user}>
        <Icon name="user outline" />
      </Button>

      <h3 className={styles.username}>{user.username}</h3>
      <h4 className={styles.email}>{user.email}</h4>
      <p className={styles.createdAt}>
        Miembro desde:{" "}
        {DateTime.fromISO(user.createdAt, { locale: "es" }).toFormat("DDD")}
      </p>
    </div>
  );
}
