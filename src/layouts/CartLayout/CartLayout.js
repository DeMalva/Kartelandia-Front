import { Container } from "semantic-ui-react";
import { Footer, HeaderCart } from "@/components/Layout";
import { Separator } from "@/components/Shared";

// Estructura de la pagina de carrito
export function CartLayout(props) {
  const { children } = props;

  return (
    <>
      <HeaderCart />
      <Separator height={150} />
      <Container>{children}</Container>
      <Separator height={70} />
      <Footer />
    </>
  );
}
