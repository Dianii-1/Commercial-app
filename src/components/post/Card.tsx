"use client";

import { Post } from "@/types/post";
import { Button, Card } from "@heroui/react";
import Link from "next/link";
import EditPostModal from "./EditPostModal";
import { getPostImage } from "@/hook/useImagePost";
import Image from "next/image";
import { DeletePostModal } from "./DeletePostModal";

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  const imageUrl = getPostImage(post.id);
  return (
    <Card
      className="
        border-none
        bg-white
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl 
        overflow-hidden
        flex flex-col h-full
      "
    >
      <div className="relative h-48 w-full bg-gray-100 rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={post.id <= 3}
        />
      </div>
      <div className="flex flex-1 flex-col p-2 md:p-6">
        <Card.Header className="p-0 mb-3">
          <Card.Title className="line-clamp-2 text-xl md:text-2xl font-black text-[#008296] leading-tight tracking-tight">
            {post.title}
          </Card.Title>
        </Card.Header>

        <div className="flex-1">
          <Card.Description className="line-clamp-3 text-sm md:text-base text-gray-600 leading-relaxed overflow-hidden">
            {post.body}
          </Card.Description>
        </div>

        <Card.Footer className="mt-6 flex justify-between items-center shrink-0">
          <Link href={`/listado/${post.id}`}>
            <Button
              size="sm"
              className="bg-[#008296] text-white font-medium px-4"
            >
              Ver más
            </Button>
          </Link>
          <div className="flex gap-4">
            <EditPostModal post={post} />

            <DeletePostModal id={post.id} />
          </div>
        </Card.Footer>
      </div>
    </Card>
  );
};
