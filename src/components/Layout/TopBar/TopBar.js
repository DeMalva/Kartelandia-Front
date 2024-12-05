import styles from "./TopBar.module.scss";
import Link from "next/link";
import { Image } from "semantic-ui-react";
import { Account } from "../Account";
import { Menu } from "../Menu";

// Aqui definimos la barra superior en la que estara el logo, el menu y la cuenta de usuario
export function TopBar(props) {
  const { isOpenSearch } = props;
  return (
    <div className={styles.topBar}>
      <div className={styles.left}>
        <Link href="/">
          <Image src="/images/logo.png" alt="Kartelandia" />
        </Link>
      </div>

      <div className={styles.center}>
        <Menu isOpenSearch={isOpenSearch} />
      </div>

      <div className={styles.right}>
        <Account />
      </div>
    </div>
  );
}
