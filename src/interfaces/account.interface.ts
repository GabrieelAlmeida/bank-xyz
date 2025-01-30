export interface BalanceResponse {
    currency: string,
    accountBalance: number
}

export interface Payeer {
    document: string,
    name: string
}
export interface Transfer {
    value: string | number,
    date: string,
    currency: string,
    payeer: Payeer
}

export interface TransferListResponse {
    message: string;
    transfers: Transfer[]
}

export interface TransferPayload {
    value: string | number;
    currency: string;
    payeerDocument: string;
    transferDate: string;
}