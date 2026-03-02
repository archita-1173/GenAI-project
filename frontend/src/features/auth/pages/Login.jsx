import React from 'react'
import"../auth.form.scss"
import { Link } from 'react-router'
import{useAuth} from "../hooks/useAuth"
import { useState } from 'react'

const Login = () => {
  const {loading,handleLogin}=useAuth()
  //2-way binding--very imp
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")




  const handleSubmit=async (e)=>{
    e.preventDefault()
    handleLogin({email,password})
}

if(loading){
    return (<main><h1>Loading..</h1></main>)
}



  return (
   <main>
    <div className="form-container">
        <h1>Login</h1>
        <form action="" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                onChange={(e)=>{setEmail(e.target.value)}} 
                type="email" name="email" id="email" placeholder='Enter your email' />
            </div>

            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                onChange={(e)=>{setPassword(e.target.value)}}
                 type="password" name="password" id="password" placeholder='Enter your password' />
            </div>
                <button className="button primary button" type="submit">Login</button>
        </form>
        <p>Dont have an account <Link to={"/register"}>Register</Link></p>
    </div>
   </main>
  )
}

export default Login
