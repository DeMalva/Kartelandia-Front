import { Token } from "@/api";

// Vamos a crear una funcion authFetch, para no tener que pasar
// el Token cada vez que haya una peticion autenticada

export async function authFetch(url, params) {
  const tokenCtrl = new Token();
  const token = tokenCtrl.getToken();

  // Creamos un Logout para salir de la sesion y colcer a la pagina de inicio
  const logout = () => {
    tokenCtrl.removeToken();
    window.location.replace("/");
  };

  // Si no existe el token o expira, nos cierra la sesion con el Logout
  if (!token) {
    logout();
  } else {
    if (tokenCtrl.hasExpired(token)) {
      logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        return await fetch(url, paramsTemp);
      } catch (error) {
        return error;
      }
    }
  }
}
