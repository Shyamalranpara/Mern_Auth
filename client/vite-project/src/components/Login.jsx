import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:1022/logIn", { email, password });
      toast(res.data.msg); 

      if(res.data.code == 100){
        navigate("/register");
      } else if(res.data.code == 200){
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful!");
setTimeout(() => {
  navigate("/dashboard");
}, 1500); // wait 1.5 seconds before navigating

      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
      <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" 
        />
      </div>
    </div>
  );
}
