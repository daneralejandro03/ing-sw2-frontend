import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recupera la información del usuario desde localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav>
      <h1>Mi Aplicación</h1>
      {user ? (
        <div>
          <span>Bienvenido, {user.fullname}</span>
          {/* Aquí puedes agregar un botón de cerrar sesión si lo deseas */}
          <div>
            <span>Correo: {user.email}</span>
          </div>
        </div>
      ) : (
        <div>
          <span>Usuario no autenticado</span>
          {/* Aquí puedes agregar enlaces a iniciar sesión o registrarse */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
