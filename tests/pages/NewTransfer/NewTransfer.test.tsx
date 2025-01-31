import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewTransfer } from "../../../src/pages/NewTransfer";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import accountService from "../../../src/services/account.service";
import { handleCurrencyToInteger } from "../../../src/utils/account.util";

// Mock hooks and utilities
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: jest.fn(),
}));
jest.mock("react-toastify");
jest.mock("../../../src/services/account.service");
jest.mock("../../../src/utils/account.util");

const mockNavigate = useNavigate as jest.Mock;
const mockQueryClient = useQueryClient as jest.Mock;
const mockToastSuccess = toast.success as jest.Mock;

describe("NewTransfer component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockQueryClient.mockReturnValue({
      clear: jest.fn(),
    });
  });

  it("renders correctly", () => {
    render(<NewTransfer />);

    expect(screen.getByText("Realize a new Transfer")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Recipient name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("USD value")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("sets default transfer date", () => {
    render(<NewTransfer />);

    const dateInput = screen.getByPlaceholderText(
      "Search by date",
    ) as HTMLInputElement;
    const today = new Date().toISOString().split("T")[0];
    expect(dateInput.value).toBe(today);
  });

  it("handles form submission successfully", async () => {
    (handleCurrencyToInteger as jest.Mock).mockReturnValue(100);
    (accountService.account.sendNewTransfer as jest.Mock).mockResolvedValue({});
    mockNavigate.mockReturnValue(jest.fn());

    render(<NewTransfer />);

    fireEvent.change(screen.getByPlaceholderText("Recipient name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("USD value"), {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(accountService.account.sendNewTransfer).toHaveBeenCalledWith({
        payeerDocument: "John Doe",
        currency: "USD",
        value: 100,
        transferDate: expect.any(String),
      });
      expect(mockToastSuccess).toHaveBeenCalledWith("Transfer was send!");
    });
  });
});
