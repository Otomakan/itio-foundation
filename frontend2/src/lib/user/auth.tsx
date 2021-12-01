
// Hook (use-auth.js)
import React, { useState, useEffect, useContext, createContext,ReactNode } from "react";
import apiRequest from "../request";
import { UserAccount } from "./types";
import Router from "next/router";
const authContext = createContext({
    loggedIn: false,
    user: {
        email: 'john@doe.com',
        firstName: 'John',
        lastName: 'Doe',
        role:'Admin',
        id: '12345'
    } as UserAccount
});
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }:{children:ReactNode}) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState({
        email: 'john@doe.com',
        firstName: 'John',
        lastName: 'Doe',
        role:'Admin',
        id: '12345'
    } );
    const [loggedIn, setLoggedIn] = useState(false)
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const login = (email:string, password:string) => {
    return 	apiRequest.post('/login', {email, password})
  };


  useEffect(() => {
    const ping = async () => {
            try {
                console.log("ping")
                const res :  UserAccount = (await apiRequest(
                '/user-accounts/current')).data
                setUser(res)
                setLoggedIn(true)

            }catch(e) {
                Router.push('/')
                setLoggedIn(false)

            }
        }
     ping()
  }, []);
  // Return the user object and auth methods
  return {
    login,
    user,
    loggedIn
  };
}