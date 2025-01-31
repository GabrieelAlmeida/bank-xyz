import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useFetchTransferList from "../../src/hooks/useFetchTransferList";
import accountService from "../../src/services/account.service";
import { TransferListResponse } from "../../src/interfaces/account.interface";

jest.mock("../../src/services/account.service");

const queryClient = new QueryClient();

describe("useFetchTransferList hook", () => {
  it("fetches and returns transfer list data", async () => {
    const mockTransferListResponse: TransferListResponse = {
      transfers: [
        {
          value: 100,
          date: "2023-01-01",
          currency: "",
          payeer: { document: "", name: "" },
        },
        {
          value: 200,
          date: "2023-01-02",
          currency: "",
          payeer: { document: "", name: "" },
        },
      ],
      message: "",
    };

    (accountService.account.getTransferList as jest.Mock).mockResolvedValue(
      mockTransferListResponse,
    );

    const { result } = renderHook(() => useFetchTransferList(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockTransferListResponse);
    expect(result.current.error).toBeNull();
  });
});
