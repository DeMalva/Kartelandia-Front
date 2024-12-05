import { ENV } from "@/utils";
import jwtDecode from "jwt-decode";
// Tenemos que instalar la libreria jwt-decode para decoficar el Token

export class Token {
  setToken(token) {
    localStorage.setItem(ENV.TOKEN, token);
  }

  // Recuperamos el Token de LocalStorage
  getToken() {
    return localStorage.getItem(ENV.TOKEN);
  }

  // Funcion para borrar el Token y poder hacer Logout
  removeToken() {
    localStorage.removeItem(ENV.TOKEN);
  }

  // Aqui controlamos que el Token de la sesion no ha expirado
  hasExpired(token) {
    const tokenDecode = jwtDecode(token);
    const expireDate = tokenDecode.exp * 1000;
    const currentDate = new Date().getTime();

    if (currentDate > expireDate) {
      return true;
    }

    return false;
  }
}
