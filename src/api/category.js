// Vamos a obtener las categorias de las peliculas

import { ENV } from "@/utils";

export class Category {
  async getAll() {
    try {
      const sort = "sort=order:asc";
      //const populate = "populate=icon";

      //Llamamos al endpoint de categorias que vine de API
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CATEGORY}?${sort}`;
      const response = await fetch(url);
      const result = await response.json();

      // Si el status en el server es distinto a 200 traemos el error
      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Funcion para obterer la categoria por el slug
  async getBySlug(slug) {
    try {
      const filters = `filters[slug][$eq]=${slug}`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CATEGORY}?${filters}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }
}
