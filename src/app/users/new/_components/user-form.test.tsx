import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { UserForm } from "./user-form";
import { UsersProvider } from "@/lib/context/users-context";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

const renderWithProvider = (component: React.ReactElement) => {
  return render(<UsersProvider>{component}</UsersProvider>);
};

describe("UserForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    renderWithProvider(<UserForm />);
  });

  describe("Rendering", () => {
    it("renders the form with all required fields", () => {
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toHaveTextContent(
        "Select your country"
      );
      expect(screen.getByText(/interests/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Add User" })
      ).toBeInTheDocument();
    });

    it("renders all interest checkboxes", () => {
      expect(screen.getByLabelText("Sports")).toBeInTheDocument();
      expect(screen.getByLabelText("Music")).toBeInTheDocument();
      expect(screen.getByLabelText("Technology")).toBeInTheDocument();
      expect(screen.getByLabelText("Travel")).toBeInTheDocument();
      expect(screen.getByLabelText("Cooking")).toBeInTheDocument();
      expect(screen.getByLabelText("Reading")).toBeInTheDocument();
      expect(screen.getByLabelText("Gaming")).toBeInTheDocument();
      expect(screen.getByLabelText("Art & Design")).toBeInTheDocument();
    });

    it("displays required indicators", () => {
      const requiredIndicators = screen.getAllByText("*");
      expect(requiredIndicators.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe("Validation", () => {
    it("shows error when full name is empty on submit", async () => {
      const submitButton = screen.getByRole("button", { name: "Add User" });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Full name is required")).toBeInTheDocument();
      });
    });

    it("shows error when age is empty on submit", async () => {
      const submitButton = screen.getByRole("button", { name: "Add User" });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Age is required")).toBeInTheDocument();
      });
    });

    it("shows error when age is less than 18", async () => {
      const user = userEvent.setup();
      const ageInput = screen.getByLabelText(/age/i);
      await user.type(ageInput, "17");

      const submitButton = screen.getByRole("button", { name: "Add User" });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("You must be 18 years or older")
        ).toBeInTheDocument();
      });
    });

    it("shows error when age is greater than 120", async () => {
      const user = userEvent.setup();
      const ageInput = screen.getByLabelText(/age/i);
      await user.type(ageInput, "121");

      const submitButton = screen.getByRole("button", { name: "Add User" });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid age")
        ).toBeInTheDocument();
      });
    });

    it("accepts valid age of 18", async () => {
      const user = userEvent.setup();
      const ageInput = screen.getByLabelText(/age/i);
      await user.type(ageInput, "18");

      const submitButton = screen.getByRole("button", { name: "Add User" });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.queryByText("You must be 18 years or older")
        ).not.toBeInTheDocument();
      });
    });

    it("shows error when country is not selected", async () => {
      const submitButton = screen.getByRole("button", { name: "Add User" });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Country is required")).toBeInTheDocument();
      });
    });

    it("shows error when no interests are selected", async () => {
      const submitButton = screen.getByRole("button", { name: "Add User" });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Please select at least one interest")
        ).toBeInTheDocument();
      });
    });

    it("shows all validation errors at once", async () => {
      const submitButton = screen.getByRole("button", { name: "Add User" });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Full name is required")).toBeInTheDocument();
        expect(screen.getByText("Age is required")).toBeInTheDocument();
        expect(screen.getByText("Country is required")).toBeInTheDocument();
        expect(
          screen.getByText("Please select at least one interest")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Error Clearing", () => {
    it("clears full name error when user starts typing", async () => {
      const user = userEvent.setup();
      const submitButton = screen.getByRole("button", { name: "Add User" });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Full name is required")).toBeInTheDocument();
      });

      const nameInput = screen.getByLabelText(/full name/i);
      await user.type(nameInput, "J");

      await waitFor(() => {
        expect(
          screen.queryByText("Full name is required")
        ).not.toBeInTheDocument();
      });
    });

    it("clears age error when user updates age", async () => {
      const user = userEvent.setup();
      const ageInput = screen.getByLabelText(/age/i);
      await user.type(ageInput, "15");

      const submitButton = screen.getByRole("button", { name: "Add User" });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("You must be 18 years or older")
        ).toBeInTheDocument();
      });

      await user.clear(ageInput);
      await user.type(ageInput, "25");

      await waitFor(() => {
        expect(
          screen.queryByText("You must be 18 years or older")
        ).not.toBeInTheDocument();
      });
    });

    it("clears interests error when user selects an interest", async () => {
      const user = userEvent.setup();
      const submitButton = screen.getByRole("button", { name: "Add User" });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Please select at least one interest")
        ).toBeInTheDocument();
      });

      const sportsCheckbox = screen.getByLabelText("Sports");
      await user.click(sportsCheckbox);

      await waitFor(() => {
        expect(
          screen.queryByText("Please select at least one interest")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Form Interaction", () => {
    it("allows user to fill out full name field", async () => {
      const user = userEvent.setup();
      const nameInput = screen.getByLabelText(/full name/i);
      await user.type(nameInput, "John Doe");

      expect(nameInput).toHaveValue("John Doe");
    });

    it("allows user to enter age", async () => {
      const user = userEvent.setup();
      const ageInput = screen.getByLabelText(/age/i);
      await user.type(ageInput, "25");

      expect(ageInput).toHaveValue(25);
    });

    it("allows selecting and deselecting interests", async () => {
      const user = userEvent.setup();
      const musicCheckbox = screen.getByLabelText("Music");

      await user.click(musicCheckbox);
      expect(musicCheckbox).toBeChecked();

      await user.click(musicCheckbox);
      expect(musicCheckbox).not.toBeChecked();
    });

    it("allows selecting multiple interests", async () => {
      const user = userEvent.setup();
      const sportsCheckbox = screen.getByLabelText("Sports");
      const musicCheckbox = screen.getByLabelText("Music");
      const travelCheckbox = screen.getByLabelText("Travel");

      await user.click(sportsCheckbox);
      await user.click(musicCheckbox);
      await user.click(travelCheckbox);

      expect(sportsCheckbox).toBeChecked();
      expect(musicCheckbox).toBeChecked();
      expect(travelCheckbox).toBeChecked();
    });
  });
});
