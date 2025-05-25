import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter your Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br /><br />
      <button onClick={handleLogin}>Login</button>
      <br /><br />
      <Link to={"/register"}>Register ?</Link>
      
      <ToastContainer 
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>



    </div>
  );
}
