"use client";
import { useEffect, useRef } from "react";

function OutsideClickHandler({
  children,
  onOutsideClick,
  exceptionRefs = [],
}: {
  children: any;
  onOutsideClick: any;
  exceptionRefs: any;
}) {
  const ref = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        const isOutsideExceptions = exceptionRefs.every(
          (exceptionRef: any) =>
            exceptionRef.current && !exceptionRef.current.contains(event.target)
        );

        if (isOutsideExceptions) {
          onOutsideClick();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick, exceptionRefs]);

  return <div ref={ref}>{children}</div>;
}

export default OutsideClickHandler;
