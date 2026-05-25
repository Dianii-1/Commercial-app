/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { EditPostModal } from "@/components/post/EditPostModal";
import { Post } from "@/types/post";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@heroui/react", () => {
  const React = require("react");

  const ModalMock = ({ children }: any) => (
    <div data-testid="modal-wrapper">{children}</div>
  );
  ModalMock.Backdrop = ({ children }: any) => <div>{children}</div>;
  ModalMock.Container = ({ children }: any) => <div>{children}</div>;
  ModalMock.Dialog = ({ children }: any) => <section>{children}</section>;
  ModalMock.Header = ({ children, className }: any) => (
    <header className={className}>{children}</header>
  );
  ModalMock.Body = ({ children, className }: any) => (
    <div className={className}>{children}</div>
  );
  ModalMock.Footer = ({ children }: any) => <footer>{children}</footer>;

  return {
    Modal: ModalMock,
    Button: ({ children, onClick, onPress, className, ...props }: any) => (
      <button className={className} onClick={onClick || onPress} {...props}>
        {children}
      </button>
    ),
    Input: React.forwardRef(({ ...props }: any, ref: any) => (
      <input ref={ref} data-testid="title" {...props} />
    )),
    TextArea: React.forwardRef(({ ...props }: any, ref: any) => (
      <textarea ref={ref} data-testid="body" {...props} />
    )),
    Label: ({ children, className }: any) => (
      <label className={className}>{children}</label>
    ),
  };
});

const mockEditPost = jest.fn();

jest.mock("../store/post.store", () => ({
  usePostsStore: (selector: any) => {
    const mockState = { editPost: mockEditPost };
    return selector(mockState);
  },
}));

const mockPost: Post = {
  id: 6,
  title: "Publicacion de prueba",
  body: "Este es el contenido de una publicación de prueba para realizar unit test",
};

describe("EditPostModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Visual del formulario con los datos de la publicación seleccionado", () => {
    render(<EditPostModal post={mockPost} />);

    expect(screen.getByText("Editar publicación")).toBeInTheDocument();
    const title = screen.getByTestId("title") as HTMLInputElement;
    const body = screen.getByTestId("body") as HTMLTextAreaElement;

    expect(title.value).toBe(mockPost.title);
    expect(body.value).toBe(mockPost.body);

    expect(
      screen.getByRole("button", { name: /cancelar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /guardar/i })
    ).toBeInTheDocument();
  });

  test("Editar el post", async () => {
    const user = userEvent.setup();

    render(<EditPostModal post={mockPost} />);

    const title = screen.getByTestId("title");
    const body = screen.getByTestId("body");
    const button = screen.getByRole("button", { name: /guardar/i });

    await user.clear(title);
    await user.type(title, "nuevo titulo de publicación");

    await user.clear(body);
    await user.type(body, "Nueva descripción.");

    await user.click(button);

    expect(mockEditPost).toHaveBeenCalledTimes(1);
    expect(mockEditPost).toHaveBeenCalledWith({
      id: 6,
      title: "nuevo titulo de publicación",
      body: "Nueva descripción.",
    });
  });

  test("Visual si la publicacion no existe", () => {
    render(<EditPostModal post={null} />);

    const title = screen.getByTestId("title") as HTMLInputElement;
    const body = screen.getByTestId("body") as HTMLTextAreaElement;

    expect(title.value).toBe("");
    expect(body.value).toBe("");
  });
});
