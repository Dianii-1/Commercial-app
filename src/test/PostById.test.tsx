/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { Post } from "@/types/post";
import PostById from "@/app/listado/[id]/page";

jest.mock("react", () => {
  const originalReact = jest.requireActual("react");
  return {
    ...originalReact,
    use: (resource: any) => {
      if (resource && typeof resource.then === "function") {
        let value: any = null;
        if (resource._value) return resource._value;
        resource.then((val: any) => {
          value = val;
        });
        return value || { id: "8" };
      }
      return resource;
    },
  };
});

jest.mock("next/image", () => {
  return function DummyImage({ src, fill, alt, ...props }: any) {
    return <img src={src} alt={alt} data-testid="image" {...props} />;
  };
});

jest.mock("../hook/useImagePost", () => ({
  getPostImage: (id: number) => `https://images.com/image-${id}.jpg`,
}));

const mockFind = jest.fn();

jest.mock("../store/post.store", () => ({
  usePostsStore: (selector: any) => {
    const mockState = {
      localPosts: {
        find: mockFind,
      },
    };
    return selector(mockState);
  },
}));

describe("PostById", () => {
  const mockPost: Post = {
    id: 8,
    title: "Publicación para prueba",
    body: "Descripción de la publicación de prueba.",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Mostrar la información de la publicación", () => {
    mockFind.mockReturnValue(mockPost);

    const mockParams = Promise.resolve({ id: "8" });
    (mockParams as any)._value = { id: "8" };

    render(<PostById params={mockParams} />);

    expect(screen.getByText("Publicación # 8")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: mockPost.title, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();

    const image = screen.getByTestId("image") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe("https://images.com/image-8.jpg");
    expect(image.alt).toBe(mockPost.title);
  });

  test("Visual si la publicación no existe", () => {
    mockFind.mockReturnValue(undefined);

    const mockParams = Promise.resolve({ id: "1001" });
    (mockParams as any)._value = { id: "1001" };

    render(<PostById params={mockParams} />);

    expect(screen.getByText("Publicación no encontrada")).toBeInTheDocument();
    expect(
      screen.getByText(/El ID #.*1001.*no existe localmente\./i)
    ).toBeInTheDocument();

    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
    expect(screen.queryByTestId("image")).not.toBeInTheDocument();
  });
});
