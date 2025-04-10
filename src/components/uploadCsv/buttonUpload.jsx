// src/components/UploadCsvButton.jsx
import React, { useState } from "react";
import { Button, message } from "antd";
import { useSelector } from "react-redux";
import { uploadCsv } from "../../api/csvUpload"; // Asegúrate de que la ruta sea la correcta
import "@ant-design/v5-patch-for-react-19";

const UploadCsvButton = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Intenta obtener el usuario desde Redux
  const reduxUser = useSelector((state) => state.auth.user);

  // Si no se encuentra en Redux, se obtiene el usuario y el token desde el localStorage
  const storedToken = reduxUser?.token || localStorage.getItem("token");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      message.error("Por favor, selecciona un archivo CSV.");
      return;
    }

    // Se verifica que se disponga del token necesario para la autenticación
    if (!storedToken) {
      message.error("No se encontró token de autenticación.");
      return;
    }

    console.log("Token de usuario:", storedToken);

    setUploading(true);

    try {
      // Pasa el token a la función de subida
      const response = await uploadCsv(file, storedToken);
      message.success("¡Archivo CSV subido exitosamente!");
      console.log("Respuesta del servidor:", response);
    } catch (error) {
      message.error(error.message || "Error al subir el archivo CSV");
      console.error("Error en la subida:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <Button
        type="primary"
        onClick={handleUpload}
        loading={uploading}
        style={{ marginLeft: 10 }}
      >
        Subir CSV
      </Button>
    </div>
  );
};

export default UploadCsvButton;
