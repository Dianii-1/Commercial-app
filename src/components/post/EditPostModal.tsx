"use client";

import { Modal, Button, Input, TextArea, Label } from "@heroui/react";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { Post } from "@/types/post";
import { GoPencil } from "react-icons/go";
import { usePostsStore } from "@/store/post.store";

interface Props {
  post: Post | null;
}

export const EditPostModal = ({ post }: Props) => {
  const { register, handleSubmit, reset } = useForm<Post>();
  const editPost = usePostsStore((state) => state.editPost);

  useEffect(() => {
    if (post) {
      reset(post);
    }
  }, [post]);

  const onSubmit = (data: Post) => {
    editPost(data);
  };

  return (
    <Modal>
      <Button
        size="sm"
        variant="ghost"
        className="cursor-pointer bg-[#FFF5D4] text-[#FAC830] w-14"
      >
        <GoPencil />
      </Button>
      <Modal.Backdrop
        variant="opaque"
        className="bg-linear-to-t from-black/80 via-black/40 to-transparent dark:from-zinc-800/80 dark:via-zinc-800/40"
      >
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-222.5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Header className="items-center text-center text-[#FAC830] text-2xl font-bold">
                Editar publicación
              </Modal.Header>

              <Modal.Body className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <Label className="text-[#008296] text-xl">Titulo</Label>
                  <Input title="Título" {...register("title")} />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-[#008296] text-xl">Descripción</Label>
                  <TextArea className="h-24" {...register("body")} />
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="ghost" slot="close">
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  slot="close"
                  className="bg-[#008296] text-white"
                >
                  Guardar
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
