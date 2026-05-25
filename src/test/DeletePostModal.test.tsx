/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeletePostModal } from "@/components/post/DeletePostModal";
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
      <button className={className} onClick={onPress || onClick} {...props}>
        {children}
      </button>
    ),
  };
});

const mockDeletePost = jest.fn();

jest.mock("../store/post.store", () => ({
  usePostsStore: (selector: any) => {
    const mockState = { deletePost: mockDeletePost };
    return selector(mockState);
  },
}));

describe("DeletePostModal", () => {
  const mockId = 42;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Visual de los textos del diálogo y el ID del post", () => {
    render(<DeletePostModal id={mockId} />);

    expect(screen.getByText("Eliminar publicación")).toBeInTheDocument();
    expect(
      screen.getByText(`Desea eliminar la publicación con el ID #${mockId}`)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /cancelar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /eliminar/i })
    ).toBeInTheDocument();
  });

  test("Eliminar el id ingresado", async () => {
    const user = userEvent.setup();

    render(<DeletePostModal id={mockId} />);

    const deleteButton = screen.getByRole("button", { name: /^eliminar$/i });

    await user.click(deleteButton);

    expect(mockDeletePost).toHaveBeenCalledTimes(1);

    expect(mockDeletePost).toHaveBeenCalledWith(mockId);
  });
});
