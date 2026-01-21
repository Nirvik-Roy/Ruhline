import {useState } from "react";
import { Authcontext } from "./Authcontext";

export const AuthProvider = ({children})=>{
    const [isLogin,setisLogin]=useState('loggedOut');

    return(
        <Authcontext.Provider value={{isLogin,setisLogin}}>
            {children}
        </Authcontext.Provider>
    )
}

