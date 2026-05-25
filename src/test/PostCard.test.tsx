/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen } from "@testing-library/react";
import { Post } from "@/types/post";
import { PostCard } from "@/components/post/Card";

jest.mock("@heroui/react", () => {
  const React = require("react");

  const CardMock = ({ children, className }: any) => (
    <div data-testid="hero-card" className={className}>
      {children}
    </div>
  );

  CardMock.Header = ({ children, className }: any) => (
    <header className={className}>{children}</header>
  );
  CardMock.Title = ({ children, className }: any) => (
    <h2 className={className}>{children}</h2>
  );
  CardMock.Description = ({ children, className }: any) => (
    <p className={className}>{children}</p>
  );
  CardMock.Footer = ({ children, className }: any) => (
    <footer className={className}>{children}</footer>
  );

  return {
    Card: CardMock,
    Button: ({ children, className, onClick, ...props }: any) => (
      <button className={className} onClick={onClick} {...props}>
        {children}
      </button>
    ),
  };
});

const mockPost: Post = {
  id: 1,
  title: "Publicación de prueba",
  body: "Esta es una publicación de prueba para realizar unit test.",
};

jest.mock("../store/post.store.ts", () => ({
  usePostsStore: () => ({
    deletePost: jest.fn(),
  }),
}));

jest.mock("../components/post/EditPostModal.tsx", () => ({
  EditPostModal: function DummyEditModal() {
    return <button>Editar</button>;
  },
}));

jest.mock("../components/post/DeletePostModal.tsx", () => ({
  DeletePostModal: function DummyDeleteModal() {
    return <button>Eliminar</button>;
  },
}));

describe("PostCard", () => {
  test("Visualizacion de titulo y contenido", () => {
    render(<PostCard post={mockPost} />);

    const titleElement = screen.getByText(mockPost.title);
    const bodyElement = screen.getByText(mockPost.body);
    const buttonElement = screen.getByRole("button", { name: /ver más/i });

    expect(titleElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });
});
