import API from "./api";

// Traer todos los barberos (usuarios con rol admin)
export const getBarbers = async () => {
  const res = await API.get("/users/barbers");
  return res.data; // devuelve un array de { _id, name }
};


// Obtener perfil del usuario logueado
export const getMyProfile = async () => {
  const { data } = await API.get("/users/me");
  return data;
};


// Actualizar nombre y email
export const updateProfile = async (profile) => {
  const { data } = await API.put("/users/me", profile);
  return data;
};


// Cambiar contraseña
export const changePassword = async (passwords) => {
  const { data } = await API.put("/users/me/password", passwords);
  return data;
};