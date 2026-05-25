/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useInfiniteScroll } from "@/hook/useInfiniteScoll";
import ListOfPostsPage from "@/app/listado/page";

jest.mock("../hook/useInfiniteScoll", () => ({
  useInfiniteScroll: jest.fn(),
}));

jest.mock("../components/post/Card", () => ({
  PostCard: ({ post }: any) => <div data-testid="card">{post.title}</div>,
}));

jest.mock("../components/post/SearchBar", () => ({
  SearchBar: ({ value, onChange }: any) => (
    <input
      data-testid="searchBar"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Buscar..."
    />
  ),
}));

jest.mock("../components/post/Skeleton", () => ({
  SkeletonPost: () => <div data-testid="skeleton">Cargando...</div>,
}));

describe("ListOfPostsPage", () => {
  const mockSetSearch = jest.fn();

  const mockListOfPosts = [
    { id: 1, title: "Primera publicación", body: "Descripción 1" },
    {
      id: 2,
      title: "Segunda publicación",
      body: "Descripción 2",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Visualizar los Skeletons cuando el estado loading está en true", () => {
    (useInfiniteScroll as jest.Mock).mockReturnValue({
      filteredPosts: [],
      hasMore: false,
      loading: true,
      observerRef: { current: null },
      search: "",
      setSearch: mockSetSearch,
    });

    render(<ListOfPostsPage />);

    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(3);
    expect(screen.queryByTestId("card")).not.toBeInTheDocument();
  });

  test("Mostrar la lista de publicaciones", () => {
    (useInfiniteScroll as jest.Mock).mockReturnValue({
      filteredPosts: mockListOfPosts,
      hasMore: true,
      loading: false,
      observerRef: { current: null },
      search: "",
      setSearch: mockSetSearch,
    });

    render(<ListOfPostsPage />);

    expect(screen.getByText("Publicaciones")).toBeInTheDocument();
    expect(
      screen.getByText("Explora contenido moderno y dinámico")
    ).toBeInTheDocument();

    const cards = screen.getAllByTestId("card");
    expect(cards).toHaveLength(2);
    expect(screen.getByText("Primera publicación")).toBeInTheDocument();
    expect(screen.getByText("Segunda publicación")).toBeInTheDocument();
  });

  test("Mostrar mensaje cuando no hay publicaciones", () => {
    (useInfiniteScroll as jest.Mock).mockReturnValue({
      filteredPosts: [],
      hasMore: false,
      loading: false,
      observerRef: { current: null },
      search: "no existe",
      setSearch: mockSetSearch,
    });

    render(<ListOfPostsPage />);

    expect(
      screen.getByText("No se encontraron publicaciones")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("card")).not.toBeInTheDocument();
  });

  test("Realizar busqueda", async () => {
    const user = userEvent.setup();

    (useInfiniteScroll as jest.Mock).mockReturnValue({
      filteredPosts: mockListOfPosts,
      hasMore: false,
      loading: false,
      observerRef: { current: null },
      search: "",
      setSearch: mockSetSearch,
    });

    render(<ListOfPostsPage />);

    const searchInput = screen.getByTestId("searchBar");

    await user.type(searchInput, "Primera");

    expect(mockSetSearch).toHaveBeenCalled();
  });

  test("Cargar mas elementos", () => {
    const mockRef = { current: null };

    (useInfiniteScroll as jest.Mock).mockReturnValue({
      filteredPosts: mockListOfPosts,
      hasMore: true,
      loading: false,
      observerRef: mockRef,
      search: "",
      setSearch: mockSetSearch,
    });

    const { container } = render(<ListOfPostsPage />);

    const observerDiv = container.querySelector(".h-10.w-full");
    expect(observerDiv).toBeInTheDocument();
  });
});
