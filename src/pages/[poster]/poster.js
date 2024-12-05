import { BasicLayout } from "@/layouts";
import { Poster } from "@/components/Poster";
import { Separator, Seo } from "@/components/Shared";
import { ENV } from "@/utils";

// Esta va a ser la pagina del poster con sus datos, los
// vamos a traer mediante el slug para traer todo

export default function PosterPage(props) {
  const { poster } = props;

  // Esta constante es para traer las imagenes del servidor Strapi
  const wallpaperUrlStrapi = `${ENV.SERVER_HOST}${poster.wallpaper.url}`;

  return (
    <>
      <Seo title={poster.name} />

      <BasicLayout>
        <Poster.HeaderWallpaper image={wallpaperUrlStrapi} />
        <Poster.Panel posterId={poster.id} poster={poster} />
        <Separator height={50} />
        <Poster.Info poster={poster} />

        <Separator height={30} />

        <Poster.Media video={poster.video} screenshots={poster.gallery} />

        <Separator height={50} />
      </BasicLayout>
    </>
  );
}
