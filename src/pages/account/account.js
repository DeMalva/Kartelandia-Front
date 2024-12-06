import { useState } from "react";
import { BasicLayout } from "@/layouts";
import { Tab } from "semantic-ui-react";
import styles from "./account.module.scss";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { Separator, Seo } from "@/components/Shared";

import {
  Info,
  Settings,
  Address,
  Wishlist,
  Orders,
} from "@/components/Account";

// Definimos un menu para opciones en la parte inferior

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [reload, setReload] = useState(false);

  // Para vaciar el local storage al pulsar el boton de salir
  const remLocal = () => {
    localStorage.removeItem("cart");
  };
  // Si no hay usuario logueado nos saca a la pagina de inicio
  if (!user) {
    router.push("/");
    return null;
  }

  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Mis pedidos",
      render: () => (
        <Tab.Pane attached={false}>
          <Orders />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Lista de deseos",
      render: () => (
        <Tab.Pane attached={false}>
          <p>Mi lista de deseos</p>
          <Wishlist />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Direcciones",
      render: () => (
        <Tab.Pane attached={false}>
          <Address.AddAddress onReload={onReload} />
          <Address.ListAddresses reload={reload} onReload={onReload} />

          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      //Esto nos dibuja la pestaña Ajustes para cambiar valores
      menuItem: { key: 20, icon: "settings", content: "Ajustes" },
      render: () => (
        <Tab.Pane attached={false}>
          <Settings.ChangeNameForm />
          <div className={styles.containerForms}>
            <Settings.ChangeEmailForm />
            <Settings.ChangePasswordForm />
          </div>
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 21,
        icon: "log out",
        content: "",
        onClick: remLocal(),

        onClick: logout, // Si pulsamo salimos de la sesion y colvemos a home
      },
    },
  ];

  return (
    <>
      <Seo title="Mi cuenta" />
      <BasicLayout isContainer relative>
        <Info />

        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          className={styles.tabs}
        />
      </BasicLayout>
    </>
  );
}
