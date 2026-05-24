"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { postSchema, PostSchema } from "@/schemas/post.schema";

import { Button, Input, Label, TextArea } from "@heroui/react";
import { usePostsStore } from "@/store/post.store";
import { Post } from "@/types/post";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const addPost = usePostsStore((state) => state.addPost);
  const localPosts = usePostsStore((state) => state.localPosts);
  const route = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostSchema) => {
    const createdPosts = localPosts.filter((post) => post.id >= 10000);

    let newId = 10000;

    if (createdPosts.length > 0) {
      const maxLocalId = createdPosts.reduce(
        (max, post) => (post.id > max ? post.id : max),
        10000
      );
      newId = maxLocalId + 1;
    }

    const newPost: Post = {
      id: newId,
      title: data.title.trim(),
      body: data.body.trim(),
    };

    setTimeout(() => {
      addPost(newPost);
      reset();
      route.replace("/listado");
    }, 100);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="mb-8 text-2xl sm:text-4xl font-black text-[#008296]">
          Nueva Publicación
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-1">
            <Label className="text-[#008296] text-lg sm:text-xl">Titulo</Label>
            <Input
              title="Título"
              placeholder="Escribe un titulo"
              {...register("title")}
            />
            {errors.title && (
              <span className="text-xs text-danger mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-[#008296] text-lg sm:text-xl">
              Descripción
            </Label>
            <TextArea
              placeholder="Escribe de que trata la publicación"
              className="h-24"
              {...register("body")}
            />
            {errors.body && (
              <span className="text-xs text-danger mt-1">
                {errors.body.message}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex gap-4 justify-end">
            <Button
              className="w-full sm:w-auto"
              variant="danger-soft"
              onPress={() => route.replace("/listado")}
              isDisabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#008296] text-white w-full sm:w-auto"
              isPending={isSubmitting}
            >
              Crear publicación
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
