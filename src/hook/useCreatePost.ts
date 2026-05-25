import { postSchema, PostSchema } from "@/schemas/post.schema";
import { usePostsStore } from "@/store/post.store";
import { Post } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useCreatePost = () => {
  const addPost = usePostsStore((state) => state.addPost);
  const localPosts = usePostsStore((state) => state.localPosts);
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostSchema) => {
    setLoading(true);
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

  return {
    loading,
    route,
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
