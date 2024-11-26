"use client";
import { useEffect } from "react";
import { useModal } from "../_contexts/ModalContext";
import AddToListModal from "./AddToListModal";

export default function ModalContainer() {
  const { currentModal, modalParams } = useModal();

  useEffect(() => {
    currentModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [currentModal]);

  if (!currentModal) {
    return null;
  }

  let modalComponent;

  switch (currentModal) {
    case "AddToListModal":
      modalComponent = <AddToListModal mediaDetails={modalParams} />;

    default:
      console.log("loading modal");
  }

  return <div className="modalContainer">{modalComponent}</div>;
}
