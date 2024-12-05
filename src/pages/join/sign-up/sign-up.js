import styles from "./sign-up.module.scss";
import { JoinLayout } from "@/layouts";
import Link from "next/link";
import { RegisterForm } from "@/components/Auth";
import { Seo } from "@/components/Shared";

export default function SignUpPage() {
  return (
    <>
      <Seo title="Registrate " />
      <JoinLayout>
        <div className={styles.signIn}>
          <h3>Crear cuenta</h3>
          <RegisterForm />
          <div className={styles.actions}>
            <Link href="/join/sign-in">Atras</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}
