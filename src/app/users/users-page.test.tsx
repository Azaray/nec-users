import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import UsersPage from "@/app/users/page";
import { UsersProvider } from "@/lib/context/users-context";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const renderWithProvider = (component: React.ReactElement) => {
  return render(<UsersProvider>{component}</UsersProvider>);
};

describe("UsersPage", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    renderWithProvider(<UsersPage />);
  });

  it("renders the page title", () => {
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  it('renders "Add User" button', () => {
    const addButton = screen.getByRole("link", { name: "Add User" });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveAttribute("href", "/users/new");
  });

  it('renders "Create your first user" button', () => {
    const addButton = screen.getByRole("link", {
      name: "Create your first user",
    });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveAttribute("href", "/users/new");
  });
});
