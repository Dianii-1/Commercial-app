"use client";

import { Spinner } from "@heroui/react";
import { SearchBar } from "@/components/post/SearchBar";
import { PostCard } from "@/components/post/Card";
import { useInfiniteScroll } from "@/hook/useInfiniteScoll";

export default function PostsPage() {
  const { filteredPosts, hasMore, loading, observerRef, search, setSearch } =
    useInfiniteScroll();
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#008296]">
              Publicaciones
            </h1>
            <p className="mt-2 text-gray-500">
              Explora contenido moderno y dinámico
            </p>
          </div>
          <div className="w-full md:w-87.5">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          !loading && (
            <div className="flex min-h-75 items-center justify-center rounded-3xl border border-dashed bg-white">
              <p className="text-lg text-gray-500">
                No se encontraron publicaciones
              </p>
            </div>
          )
        )}

        {hasMore && <div ref={observerRef} className="h-10 w-full" />}

        {loading && (
          <div className="mt-10 flex justify-center">
            <Spinner size="lg" color="accent" />
          </div>
        )}
      </div>
    </main>
  );
}
