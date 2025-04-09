// src/pages/Dashboard.jsx
import React from "react";
import UploadCsvButton from "../components/uploadCsv/buttonUpload"; // Ajusta la ruta si es necesario

const Dashboard = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bienvenido al Dashboard</h1>
      <p>Has iniciado sesión correctamente</p>
      {/* Aquí se renderiza el botón para subir el archivo CSV */}
      <UploadCsvButton />
    </div>
  );
};

export default Dashboard;
