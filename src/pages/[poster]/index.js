import { Poster } from "@/api";

export { default } from "./poster";

export async function getServerSideProps(context) {
  const {
    params: { poster },
  } = context;
  console.log(poster);

  const posterCtrl = new Poster();
  const response = await posterCtrl.getBySlug(poster);

  return {
    props: {
      poster: response,
    },
  };
}
