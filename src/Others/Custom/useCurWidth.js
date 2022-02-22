import { useState, useEffect } from "react";
import debounce from "../Debounce/debounce";

function useCurWidth() {
  const [curWidth, setCurWidth] = useState(window.innerWidth);

  useEffect(() => {
    const detectWindowWidth = debounce(function handleResize() {
      setCurWidth(window.innerWidth);
    }, 300);

    window.addEventListener("resize", detectWindowWidth);

    return () => window.removeEventListener("resize", detectWindowWidth);
  }, []);

  return curWidth;
}

export default useCurWidth;
