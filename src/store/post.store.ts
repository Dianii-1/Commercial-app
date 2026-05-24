import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Post } from "@/types/post";

interface PostsStore {
  localPosts: Post[];

  obtainAllPosts: (listOfPost: Post[]) => void;

  addPost: (post: Post) => void;

  deletePost: (id: number) => void;

  editPost: (post: Post) => void;
}

export const usePostsStore = create<PostsStore>()(
  persist(
    (set) => ({
      localPosts: [],

      obtainAllPosts: (listOfPost) =>
        set((state) => {
          const existingIds = new Set(state.localPosts.map((p) => p.id));
          const filteredNewPosts = listOfPost.filter(
            (p) => !existingIds.has(p.id)
          );

          return {
            localPosts: [...state.localPosts, ...filteredNewPosts],
          };
        }),

      addPost: (post) =>
        set((state) => ({
          localPosts: [post, ...state.localPosts],
        })),

      deletePost: (id) =>
        set((state) => ({
          localPosts: state.localPosts.filter((post) => post.id !== id),
        })),

      editPost: (updatedPost) =>
        set((state) => ({
          localPosts: state.localPosts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          ),
        })),
    }),
    {
      name: "posts-storage",
    }
  )
);
