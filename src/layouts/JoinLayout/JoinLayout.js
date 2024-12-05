import { Icon, Image } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import styles from "./JointLayout.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export function JoinLayout(props) {
  const { children } = props;
  const { user } = useAuth();
  const router = useRouter();

  // Para no entrar en la parte de Login ya estando logueado
  if (user) {
    router.push("/");
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link href="/">
          <Image src="/images/logo.png" alt="Kartelandia" />
        </Link>
        <Link href="/">
          <Icon name="close" />
        </Link>
      </div>

      <div className={styles.blockLeft} />
      <div className={styles.blockRight}>{children}</div>
    </div>
  );
}
