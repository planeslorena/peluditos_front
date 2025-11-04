"use client"
import React, { createContext, useState } from "react";
import { IUser } from "../model/IUser";

export const UserContext = createContext<{ userData?: IUser, setUserData:Function}>({
  setUserData: () => {},
});


export const UserContextProvider = ({ children }: { children: React.ReactNode}):React.ReactNode => {
  const [userData, setUserData] = useState();

  return (
    <UserContext.Provider value={{userData,setUserData}}>
      {children}
    </UserContext.Provider>
  );
}