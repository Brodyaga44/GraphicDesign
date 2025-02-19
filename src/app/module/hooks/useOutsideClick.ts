import { useEffect, useRef, useState } from "react";

const useOutsideClick = (initialValue: boolean) => {
  const [open, setOpen] = useState(initialValue);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    console.log("h", open);
    if (ref.current && !ref.current.contains(target) && open) {
      setOpen(!open);
      console.log("q", open);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open]);

  return { ref, open, setOpen };
};

export default useOutsideClick;
