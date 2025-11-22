import { useEffect, useState } from "react";

export const useMedia = (query) => {
  const media = window.matchMedia(query);
  const [matches, setMatches] = useState(media.matches);

  useEffect(() => {
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return matches;
};

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};


export function useWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Function to update width
    const updateWidth = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 640) {
        setWidth(windowWidth);
      } else {
        setWidth(windowWidth - 256);
      }
    };

    // Set initial width
    updateWidth();

    // Add event listener for window resize
    window.addEventListener('resize', updateWidth);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return width;
}