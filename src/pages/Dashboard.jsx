// src/pages/Dashboard.jsx
import React from "react";

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bienvenido al Dashboard {user?.fullname}</h1>
      <p>Has iniciado sesión correctamente</p>
    </div>
  );
};

export default Dashboard;
