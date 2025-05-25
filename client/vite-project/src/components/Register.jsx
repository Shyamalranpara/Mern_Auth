import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

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
      <div>
       <h1>Register</h1>

       <input 
       type="text" 
       placeholder='enter the name'
       onChange={(e)=>setName(e.target.value)}
       />

        <input 
       type="text"
       placeholder='enter the city'
       onChange={(e)=>setCity(e.target.value)}
       />

       <input 
       type="text"
       placeholder='enter the email'
       onChange={(e)=>setEmail(e.target.value)}
       />

       <input 
       type="text"
       placeholder='enter the password'
       onChange={(e)=>setPassword(e.target.value)}
       />

       <button onClick={handleBtn}>Register</button>

        <Link to={'/'}>Login ?</Link>
    </div>
  )
}

export default register
