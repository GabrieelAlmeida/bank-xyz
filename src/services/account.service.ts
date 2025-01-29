import axios from "axios"
import { BalanceResponse, TransferListResponse } from "../interfaces/account.interface";

export default {
    account: {
        async getBalance(): Promise<BalanceResponse> {
            return (await axios.get("/balanceApi/default/balance")).data;
        },

        async getTransferList(): Promise<TransferListResponse> {
            return (await axios.get("/transferListApi/default/transferList")).data;
        }
    },
}