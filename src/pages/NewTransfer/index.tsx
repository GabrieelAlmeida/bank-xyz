import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  handleCurrencyChange,
  handleCurrencyToInteger,
} from "../../utils/account.util";
import accountService from "../../services/account.service";
import { TransferPayload } from "../../interfaces/account.interface";

export function NewTransfer() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    setValue("transferDate", new Date().toISOString().split("T")[0]);
  }, []);

  const handleNewTransfer = async (transfer: TransferPayload) => {
    try {
      if (transfer) {
        transfer.value = handleCurrencyToInteger(transfer.value as string);
        const newTransferResponse =
          await accountService?.account?.sendNewTransfer(transfer);

        toast.success("Transfer was send!");
        queryClient.clear();

        setTimeout(() => {
          navigate("/transfers");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error when transfer!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 pr-8">
      <h2 className="mb-8 text-xl font-bold">Realize a new Transfer</h2>

      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(handleNewTransfer as any)}
      >
        <div className="container-input flex gap-4">
          <div className="flex w-102 flex-col">
            <input
              id="recipient"
              type="text"
              placeholder="Recipient name"
              title="Type a recipient name"
              className="border-brand-dark-background-100 bg-brand-dark-background-500 focus:border-brand-purple-300 h-12 w-full rounded border-2 px-4 py-4 focus:outline-none"
              autoComplete="off"
              {...register("payeerDocument")}
            />
          </div>
        </div>

        <div className="container-input flex gap-4">
          <div className="flex flex-col">
            <select
              id="currency-input"
              title="Choose a transfer USD currency"
              className="border-brand-dark-background-100 bg-brand-dark-background-500 focus:border-brand-purple-300 h-12 w-44 max-w-60 rounded border-2 px-4 focus:outline-none"
              {...register("currency")}
              autoComplete="off"
              defaultValue="USD"
            >
              <option className="h-16">USD</option>
            </select>
          </div>

          <div className="flex flex-col">
            <input
              id="currency-input"
              type="text"
              placeholder="Search by USD value"
              title="Choose a transfer USD value"
              className="border-brand-dark-background-100 bg-brand-dark-background-500 focus:border-brand-purple-300 h-12 w-full max-w-72 rounded border-2 px-4 py-4 focus:outline-none"
              {...register("value")}
              autoComplete="off"
              onChange={(e) => setValue("value", handleCurrencyChange(e))}
            />
          </div>
        </div>

        <div className="container-input flex flex-col gap-4">
          <p className="w-98">
            If would you like to schedule the transaction, please, select
            another date.
          </p>
          <div className="flex flex-col">
            <input
              id="date"
              type="date"
              value={getValues("transferDate")}
              placeholder="Search by date"
              className="border-brand-dark-background-100 bg-brand-dark-background-500 focus:border-brand-purple-300 h-12 w-full rounded border-2 px-4 py-4 focus:outline-none"
              {...register("transferDate")}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            className="bg-brand-purple-300 hover:bg-brand-purple-200 flex h-11 w-72 items-center justify-center gap-2 rounded px-10 font-semibold hover:cursor-pointer"
            type="submit"
            disabled={isSubmitting}
          >
            <Plus />
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
