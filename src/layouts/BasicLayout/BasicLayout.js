import { Container } from "semantic-ui-react";
import classNames from "classnames";
import { TopBar, Footer } from "@/components/Layout";
import styles from "./BasicLayout.module.scss";

// Aqui vamos a colocar el Layout que contendra Footer, container y TopBar
export function BasicLayout(props) {
  const {
    children,
    isOpenSearch = false, // Esta el buscador abierto?
    isContainer = false, // Tienen contenedor?
    relative = false, // Si el contenido es relativo
  } = props;

  // Instalamos la dependencia ClassNames para anidar ternarios dentro de classNames
  return (
    <>
      <TopBar isOpenSearch={isOpenSearch} />

      <Container fluid>
        <div className={classNames({ [styles.relative]: relative })}>
          {isContainer ? <Container>{children}</Container> : children}
        </div>
      </Container>

      <Footer />
    </>
  );
}
