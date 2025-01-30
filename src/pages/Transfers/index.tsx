import { GridColDef } from "@mui/x-data-grid";
import { GenericTable } from "../../components/GenericTable";
import { useLayoutEffect, useState } from "react";
import useFetchTransferList from "../../hooks/useFetchTransferList";
import { ListRestart, Search } from "lucide-react";
import { formatCurrency, handleCurrencyChange } from "../../utils/account.util";
import { useForm } from "react-hook-form";

export function Transfers() {
  const { data: transferList, isLoading: isTransferListPending } =
    useFetchTransferList();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [rowsFiltered, setRowsFiltered] = useState<any>([]);
  const { register, handleSubmit, setValue, reset } = useForm();

  useLayoutEffect(() => {
    if (transferList?.transfers) {
      setRowsFiltered(getInitialRows());
    }
  }, [transferList]);

  const columns: GridColDef[] = [
    { field: "recipient", headerName: "Recipient", width: 200 },
    {
      field: "value",
      headerName: "Value",
      width: 150,
      valueFormatter: (params: any) => formatCurrency(params.value, "USD"),
    },
    { field: "date", headerName: "Date", width: 150 },
  ];

  function getInitialRows() {
    return (
      transferList?.transfers.map((item, index) => ({
        id: index + 1,
        value: item.value,
        date: item.date,
        recipient: item.payeer.name,
      })) || []
    );
  }

  const handlePaginationChange = (newPaginationModel: any) => {
    setPaginationModel(newPaginationModel);
  };

  function filterTransfers(transfers, criteria) {
    return transfers.filter((transfer) => {
      const matchesPayeer = criteria.payeer
        ? transfer.recipient
            .toLowerCase()
            .includes(criteria.payeer.toLowerCase())
        : true;
      const matchesValue = criteria.value
        ? formatCurrency(transfer.value, "USD") === criteria.value
        : true;
      const matchesDate = criteria.date
        ? transfer.date === criteria.date
        : true;
      return matchesPayeer && matchesValue && matchesDate;
    });
  }

  const handleTransferSearch = (transfer) => {
    const filtered = filterTransfers(getInitialRows(), transfer);
    setRowsFiltered(filtered);
  };

  const handleClearFilters = () => {
    reset();
    setRowsFiltered(getInitialRows());
  };

  return (
    <div className="flex flex-col gap-4 pr-8">
      <h2 className="mb-8 text-xl font-bold">Transfer List</h2>

      <form
        className="flex gap-8"
        onSubmit={handleSubmit(handleTransferSearch)}
      >
        <div className="flex w-full flex-col">
          <input
            id="recipient"
            type="text"
            placeholder="Search by recipient name"
            className="border-brand-dark-background-100 bg-brand-dark-background-500 focus:border-brand-purple-300 h-12 w-full rounded border-2 px-4 py-4 focus:outline-none"
            autoComplete="off"
            {...register("payeer")}
          />
        </div>

        <div className="flex flex-col">
          <input
            id="currency-input"
            type="text"
            placeholder="Search by USD value"
            title="Choose a transfer USD value"
            className="border-brand-dark-background-100 bg-brand-dark-background-500 focus:border-brand-purple-300 h-12 max-w-72 rounded border-2 px-4 py-4 focus:outline-none"
            {...register("value")}
            autoComplete="off"
            onChange={(e) => setValue("value", handleCurrencyChange(e))}
          />
        </div>

        <div className="flex flex-col">
          <input
            id="date"
            type="date"
            placeholder="Search by date"
            className="border-brand-dark-background-100 bg-brand-dark-background-500 focus:border-brand-purple-300 h-12 w-full rounded border-2 px-4 py-4 focus:outline-none"
            {...register("date")}
          />
        </div>

        <div className="flex gap-4">
          <button
            className="bg-brand-purple-300 hover:bg-brand-purple-200 flex h-11 w-full items-center justify-center gap-2 rounded px-10 font-semibold hover:cursor-pointer"
            type="submit"
          >
            <Search />
            Search
          </button>

          <button
            className="bg-brand-purple-300 hover:bg-brand-purple-200 flex h-11 w-full items-center justify-center gap-2 rounded px-10 font-semibold hover:cursor-pointer"
            type="button"
            onClick={handleClearFilters}
          >
            <ListRestart />
            Clear
          </button>
        </div>
      </form>

      <GenericTable
        columns={columns}
        rows={rowsFiltered}
        pagination
        paginationModel={paginationModel}
        pageSizeOptions={[5, 10, 15]}
        onPaginationModelChange={handlePaginationChange}
        disableColumnResize
        disableRowSelectionOnClick
        disableColumnSelector
        disableColumnSorting
        loading={isTransferListPending}
      />
    </div>
  );
}
