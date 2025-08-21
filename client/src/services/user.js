import API from "./api";

// Traer todos los barberos (usuarios con rol admin)
export const getBarbers = async () => {
  const res = await API.get("/users/barbers");
  return res.data; // devuelve un array de { _id, name }
};
