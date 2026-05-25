import { usePostsStore } from "@/store/post.store";
import { Button, Modal } from "@heroui/react";
import { IoTrashOutline } from "react-icons/io5";

interface Props {
  id: number;
}
export const DeletePostModal = ({ id }: Props) => {
  const deletePost = usePostsStore((state) => state.deletePost);
  return (
    <Modal>
      <Button size="sm" className="w-14 p-0" variant="danger-soft">
        <IoTrashOutline />
      </Button>
      <Modal.Backdrop
        variant="opaque"
        className="bg-linear-to-t from-black/80 via-black/40 to-transparent dark:from-zinc-800/80 dark:via-zinc-800/40"
      >
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-100">
            <Modal.Header className="items-center text-center text-red-500 text-2xl font-bold">
              Eliminar publicación
            </Modal.Header>

            <Modal.Body className="flex flex-col gap-4">
              Desea eliminar la publicación con el ID #{id}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="ghost" slot="close">
                Cancelar
              </Button>

              <Button
                slot="close"
                onPress={() => deletePost(id)}
                variant="danger-soft"
              >
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
