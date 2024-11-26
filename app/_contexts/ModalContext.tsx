"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";

interface ModalContextType {
  currentModal: any;
  setCurrentModal: React.Dispatch<React.SetStateAction<any>>;
  modalParams: any;
  setModalParams: React.Dispatch<React.SetStateAction<any>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentModal, setCurrentModal] = useState<any>(null);
  const [modalParams, setModalParams] = useState<any>(null);

  const values: ModalContextType = {
    currentModal,
    setCurrentModal,
    modalParams,
    setModalParams,
  };

  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal deve ser usado dentro de um ModalProvider");
  }
  return context;
};
