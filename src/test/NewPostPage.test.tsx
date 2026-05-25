/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCreatePost } from "@/hook/useCreatePost";
import NewPostPage from "@/app/listado/nuevo/page";

jest.mock("../hook/useCreatePost", () => ({
  useCreatePost: jest.fn(),
}));

jest.mock("@heroui/react", () => {
  const React = require("react");
  return {
    Spinner: ({ size, color }: any) => (
      <div data-testid="spinner">{`Cargando (${size}-${color})...`}</div>
    ),
    Label: ({ children }: any) => <label>{children}</label>,
    Input: React.forwardRef(({ ...props }: any, ref: any) => (
      <input ref={ref} data-testid="title" {...props} />
    )),
    TextArea: React.forwardRef(({ ...props }: any, ref: any) => (
      <textarea ref={ref} data-testid="body" {...props} />
    )),
    Button: ({ children, onClick, onPress, type, ...props }: any) => (
      <button type={type} onClick={onPress || onClick} {...props}>
        {children}
      </button>
    ),
  };
});

const mockOnSubmit = jest.fn();
const mockHandleSubmit = jest.fn((callback) => (e: any) => {
  if (e && typeof e.preventDefault === "function") {
    e.preventDefault();
  }
  callback({});
});

const mockReplace = jest.fn();
const defaultValue = {
  loading: false,
  route: { replace: mockReplace },
  register: jest.fn(),
  handleSubmit: mockHandleSubmit,
  onSubmit: mockOnSubmit,
  errors: {},
};

describe("NewPostPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Mostrar spinner cuando loading esta en true", () => {
    (useCreatePost as jest.Mock).mockReturnValue({
      ...defaultValue,
      loading: true,
    });

    render(<NewPostPage />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Nueva Publicación" })
    ).not.toBeInTheDocument();
  });

  test("Mostrar el formulario", () => {
    (useCreatePost as jest.Mock).mockReturnValue(defaultValue);

    render(<NewPostPage />);

    expect(
      screen.getByRole("heading", { name: "Nueva Publicación", level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("body")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /cancelar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /crear publicación/i })
    ).toBeInTheDocument();
  });

  test("Redireccionar al listado si cancela la creación", async () => {
    const user = userEvent.setup();
    (useCreatePost as jest.Mock).mockReturnValue(defaultValue);

    render(<NewPostPage />);

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    await user.click(cancelButton);

    expect(mockReplace).toHaveBeenCalledWith("/listado");
  });

  test("Ejecutar la creación de la publicación", async () => {
    const user = userEvent.setup();
    (useCreatePost as jest.Mock).mockReturnValue(defaultValue);

    render(<NewPostPage />);

    const submitButton = screen.getByRole("button", {
      name: /crear publicación/i,
    });
    await user.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  test("Mostrar mensajes de error", () => {
    (useCreatePost as jest.Mock).mockReturnValue({
      ...defaultValue,
      errors: {
        title: {
          message: "El título es obligatorio y debe tener mínimo 5 caracteres",
        },
        body: {
          message:
            "La descripción es obligatoria y debe tener mínimo 10 caracteres",
        },
      },
    });

    render(<NewPostPage />);

    expect(
      screen.getByText(
        "El título es obligatorio y debe tener mínimo 5 caracteres"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "La descripción es obligatoria y debe tener mínimo 10 caracteres"
      )
    ).toBeInTheDocument();
  });
});
