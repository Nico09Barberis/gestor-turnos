import API from "./api";

// Traer todos los barberos
export const getAllBarbers = async () => {
  const res = await API.get("/admin/barbers");
  return res.data;
};

// Crear un barbero
export const createBarber = async (barberData) => {
  const res = await API.post("/admin/barbers", barberData);
  return res.data;
};

// Actualizar un barbero
export const updateBarber = async (id, barberData) => {
  const res = await API.put(`/admin/barbers/${id}`, barberData);
  return res.data;
};

// Eliminar un barbero
export const deleteBarber = async (id) => {
  const res = await API.delete(`/admin/barbers/${id}`);
  return res.data;
};
