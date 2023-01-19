// import {Firebase} from '../Firebase/config';

import { createContext, useState } from "react";

export const FirebseContext = createContext(null);

// Another way to create context
export const AuthContext = createContext(null);
export default function Context({children}){
    const [user,setUser] = useState(null);
    return(
      <AuthContext.Provider value={{user,setUser}}>
        {children}
      </AuthContext.Provider>
    )
}


