import React, { useEffect, useRef } from "react";
import { useState } from "react";
export function useInfinite(observerRef, fetchItems) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      const newItems = await fetchItems(page);
      setItems((prev) => [...prev, ...newItems]);
      setLoading(false);
      if (newItems.length === 0) setHasMore(false);
    };
    loadItems();
  }, [page]);

  useEffect(() => {
    if (!observerRef?.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        //[] default
        if (entries[0].isIntersecting) {
          // div is visible?
          setPage((prev) => prev + 1);
        }
      },

      { threshold: 1 }
    );
    observer.observe(observerRef.current); //observer.observer(div)
    return () => observer.disconnect();
  }, [hasMore]);

  return { items, loading };
}
