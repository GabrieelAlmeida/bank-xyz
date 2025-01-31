import { renderHook, waitFor } from "@testing-library/react";
import * as fetchBalanceService from "../../src/services/account.service";
import useFetchBalance from "../../src/hooks/useFetchBalance";
import { BalanceResponse } from "../../src/interfaces/account.interface";

const fetchBalanceSpyOn = jest.spyOn(
  fetchBalanceService.default.account,
  "getBalance",
);

describe("useFetchBalance hook", () => {
  const balanceResponseMocked: BalanceResponse = {
    currency: "USD",
    accountBalance: 9000,
  };
  it("renders it", async () => {
    fetchBalanceSpyOn.mockResolvedValue(balanceResponseMocked);

    const { result } = renderHook(() => useFetchBalance());

    await waitFor(() => {
      expect(result.current.balance).toEqual(balanceResponseMocked);
    });
  });
});
