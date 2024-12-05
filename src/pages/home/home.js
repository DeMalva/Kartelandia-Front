import { BasicLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { Home } from "@/components/Home";
import { Separator, BarTrust, BannerAd, Seo } from "@/components/Shared";
import { useCart } from "@/hooks";

// En este archivo insertamos todos los componentes que van a ir
// en la pagina principal. Podemos ordenarlos y colocarlos como queramos
const categoriesId = {
  Accion: 8,
  Aventura: 6,
  Comedia: 7,
  Terror: 9,
  infantil: 11,
  romantica: 10,
};

export default function HomePage() {
  return (
    <>
      <Seo />
      <BasicLayout>
        <Home.BannerLastPosterPublished />

        <Separator height={100} />

        <Container>
          <Home.LatestPosters title="Ultimos lanzamientos" />
        </Container>
        <Separator height={100} />
        <BarTrust />
        <Separator height={100} />
        <Container>
          <Home.LatestPosters
            title="Terror"
            limit={3}
            categoryId={categoriesId.Terror}
          />
        </Container>
        <Separator height={100} />
        <BannerAd
          title="Registrate y obten los mejores precios en todo nuestro catalogo"
          subtitle="¡El MEJOR precio garantizado!"
          btnTitle="Entrar ahora"
          btnLink="/join/sign-in"
          image="/images/img01.png"
        />
        <Separator height={50} />
      </BasicLayout>
    </>
  );
}