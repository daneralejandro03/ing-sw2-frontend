import { Typography, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import { auth } from "../../api/auth";
import { setLoading } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";


const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    email: "",
    current_password: "",
  });

  const dispatch = useDispatch();

  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null);
  console.log(`Is authenticated: ${isAuthenticated}`);

  const validateForm = () => {
    const newErrors = {};
    // Validación de email
    if (!formData.email) {
      newErrors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Validación de password
    if (!formData.current_password) {
      newErrors.current_password = "Password is required!";
    }

    setErrors(newErrors);
    // Si el objeto de errores esta vacio, la forma es valida
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    //Capturar nombre del input y valor que el usuario esta ingresando
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);

    if (!validateForm()) {
      return;
    }

    dispatch(setLoading(true));

    try {
      const response = await auth.signIn(formData);
      console.log(response);

      setShow2FAModal(true);
      
    } catch (error) {
      setLoginError("Invalid email or password");
    }
  };

  const [show2FAModal, setShow2FAModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerify2FA = async () => {
    try {
      const email = formData.email;
  
      const result = await auth.signInVerify({
        email,
        code: verificationCode,
      });

      if (result.success) {
        setShow2FAModal(false);
        navigate("/dashboard");
      } else {
        console.log('cuack');
        
        alert(result.message || "El código no es correcto.");

      }
    } catch (err) {
      Modal.error({
        title: "Error",
        content: "Hubo un problema validando el código. Intenta de nuevo.",
      });
    }
  };
  
  


  return (
    <div className="login-container">
      <Title level={2} style={{ textAlign: "center" }}>
        LogIn
      </Title>
      <form onSubmit={handleSubmit}>
        {/* input de email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        {/* input de password */}
        <div className="form-group">
          <label htmlFor="current_password">Password</label>
          <input
            type="password"
            id="current_password"
            name="current_password"
            value={formData.current_password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.current_password && (
            <span className="field-error">{errors.current_password}</span>
          )}
        </div>

        {/* boton de submit */}
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <Modal
        title="Verify  Code"
        
        open={show2FAModal}
        onOk={handleVerify2FA}
        onCancel={() => setShow2FAModal(false)}
        okText="Verify"
        cancelText="Cancel"
      >

        <p>Recuerda revisar tus mensajes directos, tú código solo va a estar disponible por 5 minutos </p>

        <input
          type="text"
          placeholder="Enter verification code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 10 }}
        />
      </Modal>

    </div>
  );

  
};

export default Login;
