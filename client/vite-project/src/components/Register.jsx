import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css';

const register = () => {
    const [name,setName]=useState("")
    const [city,setCity]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const navigate = useNavigate()
const handleBtn = async () => {
    await axios.post("http://localhost:1022/register", { name, city, email, password })
    .then((res) => {
        console.log(res); // Check this in browser console
        alert(res.data.msg);
        navigate("/");
    })
    .catch((err) => {
        console.log(err); // See if error is coming instead
        alert("Something went wrong!");
    });
}

  return (
      <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your city"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleBtn}>Register</button>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default register
