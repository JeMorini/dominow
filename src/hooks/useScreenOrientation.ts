import { useState, useEffect } from "react";

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState(
    window.screen.orientation
      ? window.screen.orientation.type
      : "portrait-primary"
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(
        window.screen.orientation
          ? window.screen.orientation.type
          : "portrait-primary"
      );
    };

    if (window.screen.orientation) {
      window.screen.orientation.addEventListener(
        "change",
        handleOrientationChange
      );
    } else {
      const handleResize = () => {
        setOrientation(
          window.innerWidth > window.innerHeight
            ? "landscape-primary"
            : "portrait-primary"
        );
      };
      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }

    // Limpeza
    return () => {
      if (window.screen.orientation) {
        window.screen.orientation.removeEventListener(
          "change",
          handleOrientationChange
        );
      }
    };
  }, []);

  return orientation;
};

export default useScreenOrientation;
