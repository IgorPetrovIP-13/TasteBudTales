import { useState, useEffect } from "react";

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint());

  function getBreakpoint() {
    if (window.matchMedia("(max-width: 768px)").matches) {
      return "small";
    } else if (window.matchMedia("(max-width: 992px)").matches) {
      return "medium";
    } else {
      return "large";
    }
  }

  useEffect(() => {
    function handleResize() {
      setBreakpoint(getBreakpoint());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoint;
}
