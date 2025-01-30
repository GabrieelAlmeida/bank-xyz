import axios from "axios"
import { BalanceResponse, TransferListResponse, TransferPayload } from "../interfaces/account.interface";

export default {
    account: {
        async getBalance(): Promise<BalanceResponse> {
            return (await axios.get("/balanceApi/default/balance")).data;
        },

        async getTransferList(): Promise<TransferListResponse> {
            return (await axios.get("/transferListApi/default/transferList")).data;
        },

        async sendNewTransfer(transfer: TransferPayload): Promise<unknown> {
            return await axios.post("/newTransferApi/default/transfer", transfer);
        }
    },
}