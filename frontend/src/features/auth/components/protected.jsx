import { useAuth } from "../hooks/useAuth";
import React from 'react'
import { Navigate } from "react-router";
//this is a wrapper for things to get into protected
//check someparts are missing @2:50secs
const protected = ({children}) => {
    const{loading,user}=useAuth;
    
    if(loading){
        return(<main><h1>Loading...</h1></main>)
    }
    if(!user){
     
    return <Navigate to={"./login"}/>
    }
  return children
   
}

export default protected
