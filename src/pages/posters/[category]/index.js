import { Category, Poster } from "@/api";
//import { Pagination } from "semantic-ui-react";

export { default } from "./category";

// Vamos a conseguir los datos de la parte del servidor y se
// los pasamos al cliente

export async function getServerSideProps(context) {
  const { query, params } = context;
  const { page = 1 } = query;
  const { category } = params;

  //   const {
  //     params: { category },
  //     query: { page = 1 },
  //   } = context;

  const categoryCtrl = new Category();
  const responseCategory = await categoryCtrl.getBySlug(category);

  const posterCtrl = new Poster();
  const responsePoster = await posterCtrl.getPostersByCategorySlug(
    category,
    page
  );

  return {
    props: {
      //   category: responseCategory,
      //   posters: responsePosters.data,
      //   Pagination: responsePosters.meta,

      category: responseCategory,
      posters: responsePoster.data,
      pagination: responsePoster.meta.pagination,
    },
  };
}
