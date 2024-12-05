import { ENV, authFetch } from "@/utils";
import { forEach } from "lodash";

export class Cart {
  add(posterId) {
    // Añadimos posters al carrito
    const posters = this.getAll();

    const objIndex = posters.findIndex((poster) => poster.id === posterId);

    // Esta es la logica para añadir mas productos al carrito
    if (objIndex < 0) {
      posters.push({ id: posterId, quantity: 1 });
    } else {
      const poster = posters[objIndex];
      posters[objIndex].quantity = poster.quantity + 1;
    }

    localStorage.setItem(ENV.CART, JSON.stringify(posters));
  }

  // REcuperamos todos los productos del carrito
  getAll() {
    const response = localStorage.getItem(ENV.CART);

    if (!response) {
      return [];
    } else {
      return JSON.parse(response);
    }
  }
  // Creamos un contador para mostrar los posters en el icono
  count() {
    const response = this.getAll();
    let count = 0;

    forEach(response, (item) => {
      count += item.quantity;
    });

    return count;
  }
  // Funcion para cambiar la cantidad de cada poster en el carrito
  changeQuantity(posterId, quantity) {
    const posters = this.getAll();
    const objIndex = posters.findIndex((poster) => poster.id === posterId);

    posters[objIndex].quantity = quantity;

    localStorage.setItem(ENV.CART, JSON.stringify(posters));
  }

  // Borrar posters de el carrito
  delete(posterId) {
    const posters = this.getAll();
    const updatePosters = posters.filter((poster) => poster.id !== posterId);

    localStorage.setItem(ENV.CART, JSON.stringify(updatePosters));
  }

  deleteAll() {
    localStorage.removeItem(ENV.CART);
  }

  async paymentCart(token, products, idUser, address) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAYMENY_ORDER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          products,
          idUser,
          addressShipping: address,
        }),
      };

      const response = await authFetch(url, params);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
