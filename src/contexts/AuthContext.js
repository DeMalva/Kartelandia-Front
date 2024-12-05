import { useState, useEffect, createContext } from "react";
import { Token, User } from "@/api";

const tokenCtrl = new Token();
const userCtrl = new User();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ahora vamos a recuperar la sesion en cada recarga de la pagina
  useEffect(() => {
    (async () => {
      const token = tokenCtrl.getToken(); //Recuperamos el Token

      if (!token) {
        // Si no existe salimos de la sesion
        logout();
        setLoading(false);
        return;
      }

      // Comprobamos si ha caducado el Token
      if (tokenCtrl.hasExpired(token)) {
        logout();
      } else {
        await login(token);
      }
    })();
  }, []);

  // Iniciamos sesion
  const login = async (token) => {
    try {
      tokenCtrl.setToken(token); // Guardamos Token em LocalStorage
      const response = await userCtrl.getMe(); // Obtenemos datos de usuario
      setUser(response); // Seteamos datos del usuario en el estado
      setToken(token); // Seteamos el Token en el estado
      setLoading(false); // Terminamos con el loading en False
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Aqui salimos de la sesion y borramos Token y borramos estados
  const logout = () => {
    tokenCtrl.removeToken();
    setToken(null);
    setUser(null);
  };

  // Actualizar user a nivel local
  const updateUser = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
    updateUser,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
