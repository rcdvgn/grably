"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";

// Definindo o tipo do contexto
interface ActionsContextType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedMediaMeta: any;
  setSelectedMediaMeta: any;
  isSearchOverlayVisible: any;
  setIsSearchOverlayVisible: any;
}

const ActionsContext = createContext<ActionsContextType | undefined>(undefined);

export const ActionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMediaMeta, setSelectedMediaMeta] = useState<any>(null);
  const [isSearchOverlayVisible, setIsSearchOverlayVisible] =
    useState<any>(false);

  // useEffect(() => {
  //   console.log(selectedMediaMeta?.selectedMediaType);
  // }, [selectedMediaMeta]);

  const values: ActionsContextType = {
    searchQuery,
    setSearchQuery,
    selectedMediaMeta,
    setSelectedMediaMeta,
    isSearchOverlayVisible,
    setIsSearchOverlayVisible,
  };

  return (
    <ActionsContext.Provider value={values}>{children}</ActionsContext.Provider>
  );
};

export const useActions = (): ActionsContextType => {
  const context = useContext(ActionsContext);
  if (!context) {
    throw new Error("useActions deve ser usado dentro de um ActionsProvider");
  }
  return context;
};
