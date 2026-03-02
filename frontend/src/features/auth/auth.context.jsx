import { createContext  ,useState 
 } from "react";

 export const AuthContext= createContext() //contextapi gobal making of things

 export const AuthProvider=({children})=>{
 const[user,setUser]=useState(null)
 const[loading,setLoading]=useState(false)

 return(
    <AuthContext.Provider value={{user,setUser,loading,setloading}}>
     {children}
    </AuthContext.Provider>
 )



 }