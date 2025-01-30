import { TransferListResponse } from "../interfaces/account.interface";
import accountService from "../services/account.service";
import { useQuery } from "@tanstack/react-query";

function useFetchTransferList() {
  async function handleGetTransferList() {
    const transferListResponse: TransferListResponse =
      await accountService.account.getTransferList();

    return transferListResponse;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["transferList"],
    queryFn: handleGetTransferList,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { isLoading, data, error };
}

export default useFetchTransferList;
