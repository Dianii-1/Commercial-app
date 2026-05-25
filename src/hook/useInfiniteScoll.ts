/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { getPostsByPage } from "@/services/post.service";
import { usePostsStore } from "@/store/post.store";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const LIMIT = 9;
export const useInfiniteScroll = () => {
  const { localPosts, obtainAllPosts } = usePostsStore();

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [hasMore, setHasMore] = useState(true);

  const [search, setSearch] = useState("");

  const observerRef = useRef<HTMLDivElement | null>(null);

  const getPostsByPagination = useCallback(async () => {
    if (!hasMore) return;

    setLoading(true);

    try {
      const data = await getPostsByPage(page, LIMIT);

      if (data.length < LIMIT) {
        setHasMore(false);
      }

      if (data.length > 0) {
        setTimeout(() => {
          obtainAllPosts(data);
          setPage((prev) => prev + 1);
        }, 0);
      }
    } catch (error) {
      console.log("error al obtener los datos", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, obtainAllPosts]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && page === 1) {
      getPostsByPagination();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const currentTarget = observerRef.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          getPostsByPagination();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [getPostsByPagination, loading, hasMore]);

  const filteredPosts = useMemo(() => {
    return localPosts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [localPosts, search]);

  return {
    loading,
    observerRef,
    setSearch,
    filteredPosts,
    hasMore,
    search,
  };
};
