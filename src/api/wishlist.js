import { ENV, authFetch } from "@/utils";
// Vamos a crear varias funciones para dar uso a la lista de deseos

export class Wishlist {
  // La funcion check es para comprobar si esta en la lista de deseos o no
  async check(userId, posterId, documentId) {
    try {
      const filterUser = `filters[user][id][$eq][0]=${userId}`;
      const filterPoster = `filters[poster][id][$eq][1]=${posterId}`;
      const urlParams = `${filterUser}&${filterPoster}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${urlParams}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      if (result.data.length === 0) {
        return false;
      }

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }

  // Funcion para añadir un poster a favoritos
  async add(userId, posterId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            user: userId,
            poster: posterId,
          },
        }),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  // Funcion para borrar un poster de la lista de deseados
  async delete(documentId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}/${documentId}`;
      const params = {
        method: "DELETE",
      };
      const response = await authFetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAll(userId) {
    try {
      const filters = `filters[user][id][$eq]=${userId}`;
      const populate = "populate[0]=poster&populate[1]=poster.cover";
      const urlParams = `${filters}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${urlParams}`;
      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }
}
