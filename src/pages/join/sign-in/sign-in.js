import Link from "next/link";
import styles from "./sign-in.module.scss";
import { JoinLayout } from "@/layouts";
import { LoginForm } from "@/components/Auth";
import { Seo } from "@/components/Shared";

export default function SingInPage() {
  return (
    <>
      <Seo title="Iniciar sesión" />
      <JoinLayout>
        <div className={styles.signIn}>
          <h3>Iniciar sesión</h3>
          <LoginForm />
          <div className={styles.actions}>
            <Link href="/join/sign-up">Crea tu cuenta</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}
