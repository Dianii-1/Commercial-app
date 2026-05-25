"use client";
import { getPostImage } from "@/hook/useImagePost";
import { usePostsStore } from "@/store/post.store";
import Image from "next/image";
import { use } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function PostById({ params }: Props) {
  const { id } = use(params);

  const post = usePostsStore((state) =>
    state.localPosts.find((p) => p.id === Number(id))
  );

  const imageUrl = getPostImage(Number(id));
  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-10">
        <div className="rounded-2xl bg-white p-10 text-center shadow-md">
          <p className="text-2xl font-bold text-gray-700">
            Publicación no encontrada
          </p>
          <p className="mt-2 text-sm text-gray-400">
            El ID # {id} no existe localmente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="flex flex-col gap-8 mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl">
        <span className="w-fit rounded-full bg-[#FAC830] px-4 py-2 text-sm font-semibold">
          Publicación # {post.id}
        </span>

        <h1 className="text-3xl md:text-5xl font-black text-[#008296]">
          {post.title}
        </h1>

        <div className="relative h-60 w-full bg-gray-100">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="eager"
          />
        </div>
        <p className="text-lg leading-relaxed text-gray-600">{post.body}</p>
      </div>
    </main>
  );
}
