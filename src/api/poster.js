import { ENV } from "@/utils";

export class Poster {
  async getLastPublished() {
    try {
      // Meidante filtros ordenamos los poster por fecha para sacar el ultimo publicado
      const sort = "sort=publishedAt:desc";
      const pagination = "pagination[limit]=1";
      const populate = "populate=*";
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POSTER}?${sort}&${pagination}&${populate}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
  // Funcion para recuperar los ultimos posters subidos
  // mediante unos filtros
  async getLatestPublished({ limit = 9, categoryId = null }) {
    try {
      const filterCategory =
        categoryId && `filters[category][id][$eq]=${categoryId}`;
      const paginationLimit = `pagination[limit]=${limit}`;
      const sort = `sort[0]=publishedAt:desc`;
      const populate = `populate=*`;
      const urlParams = `${sort}&${paginationLimit}&${filterCategory}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POSTER}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  //Funcion para devolver todos los poster asociados a esta categoria
  async getPostersByCategorySlug(slug, page) {
    try {
      const filters = `filters[category][slug][$eq]=${slug}`;
      const pagination = `pagination[page]=${page}&pagination[pageSize]=3`;
      const populate = "populate=*";
      const urlParams = `${filters}&${pagination}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POSTER}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Funcion para encontrar los posters por nombre
  async searchPosters(text, page) {
    try {
      const filters = `filters[name][$contains]=${text}`;
      const pagination = `pagination[page]=${page}&pagination[pageSize]=2`;
      const populate = "populate=*";
      const urlParams = `${filters}&${pagination}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POSTER}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Funcion para conseguir los datos de un poster a travves del slug
  async getBySlug(slug) {
    try {
      const filters = `filters[slug][$eq]=${slug}`;
      const populate = "populate=*";
      // const populate = `populate[0]=wallpaper&populate[1]=cover&populate&populate[2]=screenshots&populate[3]=category`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POSTER}?${filters}&${populate}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }

  // Funcion para conseguir los datos del poster a traves de su id
  async getPosterById(id) {
    try {
      // const populate = `populate[0]=cover&populate[1]=category`;
      const populate = "populate=*";
      // const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POSTER}/${id}?${populate}`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POSTER}?${populate}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      for (var n in result.data) {
        if (result.data[n].id == id) {
          return result.data[n];
        }
      }

      throw 0;
    } catch (error) {
      throw error;
    }
  }
}
