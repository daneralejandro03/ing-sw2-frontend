// src/pages/Dashboard.jsx
import React from "react";
import Navbar from "../components/Navbar/userAutenticate"; // Ajusta la ruta si es necesario
import UploadCsvButton from "../components/uploadCsv/buttonUpload"; // Ajusta la ruta si es necesario
import MunicipiosTable from "../components/Table/TableMunicipios"; // Ajusta la ruta si es necesario

const Dashboard = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Navbar />
      <UploadCsvButton />
      <MunicipiosTable />
    </div>
  );
};

export default Dashboard;
