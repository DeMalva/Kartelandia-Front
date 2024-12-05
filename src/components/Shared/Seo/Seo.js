import Head from "next/head";

// Este componente lo creamos para utilizar la estiquetas Meta y hacer nuestra web mas
// visible a los navegadores
export function Seo(props) {
  const { title = "KARTELENDIA", description = "Tienda online de Posters " } =
    props;

  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
}
