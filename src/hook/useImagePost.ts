import { IMAGES } from "@/constants/images";

export const getPostImage = (postId: number): string => {
  const imageIndex = postId % IMAGES.length;
  return IMAGES[imageIndex];
};
