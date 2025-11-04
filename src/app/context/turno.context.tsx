"use client"
import React, { createContext, useState } from "react";
import { ITurno } from "../model/Iturno";

export const TurnoContext = createContext<{ turnoData?: ITurno, setTurnoData:Function}>({
  setTurnoData: () => {},
});


export const TurnoContextProvider = ({ children }: { children: React.ReactNode}):React.ReactNode => {
  const [turnoData, setTurnoData] = useState();

  return (
    <TurnoContext.Provider value={{turnoData,setTurnoData}}>
      {children}
    </TurnoContext.Provider>
  );
}