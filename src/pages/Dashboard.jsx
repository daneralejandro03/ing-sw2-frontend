// src/pages/Dashboard.jsx
import React from "react";
import UploadCsvButton from "../components/uploadCsv/buttonUpload"; // Ajusta la ruta si es necesario

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bienvenido al Dashboard {user?.fullname}</h1>
      <p>Has iniciado sesión correctamente</p>
      {/* Aquí se renderiza el botón para subir el archivo CSV */}
      <UploadCsvButton />
    </div>
  );
};

export default Dashboard;
