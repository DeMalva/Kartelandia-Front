import { AuthProvider, CartProvider } from "@/contexts";
import "semantic-ui-css/semantic.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/scss/global.scss";
// Para que el carrito tenga acceso a los datos del usuario, lo ponemos en el hijo
export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}
