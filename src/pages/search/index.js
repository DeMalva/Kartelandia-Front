import { Poster } from "@/api";

export { default } from "./search";

// Hacemos una peticion al servidor para sacar los poster por letra
export async function getServerSideProps(context) {
  const {
    query: { s, page = 1 },
  } = context;

  const posterCtrl = new Poster();
  const response = await posterCtrl.searchPosters(s, page);

  return {
    props: {
      posters: response.data,
      pagination: response.meta.pagination,
      searchText: s,
    },
  };
}
