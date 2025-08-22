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


// ================= BARBER PERFIL =================

// Obtener perfil del barbero logueado
export const getMyProfile = async () => {
  const res = await API.get("/admin/barbers/me");
  return res.data;
};

// Actualizar perfil del barbero (nombre, email)
export const updateMyProfile = async (profileData) => {
  const res = await API.put("/admin/barbers/me", profileData);
  return res.data;
};

// Cambiar contraseña del barbero
export const changeMyPassword = async (passwordData) => {
  const res = await API.put("/admin/barbers/me/change-password", passwordData);
  return res.data;
};