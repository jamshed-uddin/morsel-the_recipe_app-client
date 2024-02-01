import { useEffect, useRef } from "react";

const useIntersect = (callback) => {
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const itemToIntersect = loadMoreRef.current;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        callback(entry.isIntersecting);
      });
    };

    const intObserver = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    });

    if (itemToIntersect) {
      intObserver.observe(itemToIntersect);
    }

    return () => {
      if (itemToIntersect) {
        intObserver.unobserve(itemToIntersect);
      }
    };
  }, [callback]);

  return loadMoreRef;
};

export default useIntersect;
