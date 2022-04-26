import { useState, useEffect } from "react";
import throttle from "../Throttle/throttle";

function useCurWidth() {
  const [curWidth, setCurWidth] = useState(window.innerWidth);

  useEffect(() => {
    const detectWindowWidth = throttle(function handleResize() {
      setCurWidth(window.innerWidth);
    }, 300);

    window.addEventListener("resize", detectWindowWidth);

    return () => window.removeEventListener("resize", detectWindowWidth);
  }, []);

  return curWidth;
}

export default useCurWidth;
