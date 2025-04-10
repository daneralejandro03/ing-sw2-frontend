// src/api/csvRoutes.js
import { ENV } from "../utils";
const { API_ROUTES } = ENV;

// Función para subir CSV (la que ya tienes)
export const uploadCsv = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${ENV.BASE_API}${API_ROUTES.CSV_UPLOAD}`, {
    method: "POST",
    body: formData,
    headers: {
      // Incluye la cabecera de autorización
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "CSV upload failed");
  }

  return response.json();
};

// Función para obtener todos los municipios
export const getAllMunicipios = async (token) => {
  const response = await fetch(`${ENV.BASE_API}${API_ROUTES.MUNICIPIOS}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Error al obtener los municipios");
  }

  return response.json();
};

// Función para obtener todos los departamentos
export const getAllDepartamentos = async (token) => {
  const response = await fetch(`${ENV.BASE_API}${API_ROUTES.DEPARTAMENTOS}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Error al obtener los departamentos");
  }

  return response.json();
};
