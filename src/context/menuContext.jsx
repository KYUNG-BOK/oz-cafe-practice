import React, { createContext, useContext, useState } from "react";
import data from "../assets/data";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu] = useState(data.menu); // 오류 방지를 위해 setMenu 제거

  return (
    <MenuContext.Provider value={{ menu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);