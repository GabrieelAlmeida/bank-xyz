import { ChangeEvent } from "react";
import { Transfer, TransferListResponse } from "../interfaces/account.interface";

export function formatCurrency(balance: any, currency: any) {
    return balance?.toLocaleString("en-US", {
        style: 'currency',
        currency: currency ?? 'USD'
    });
}

export function formatTransfersToGraphList(transfersList: TransferListResponse) {
    if (transfersList?.transfers) {
        return transfersList?.transfers?.map((transfer) => ({
            value: transfer?.value,
            date: transfer?.date
        }))
            .sort((a, b) => new Date(a?.date).getTime() - new Date(b?.date).getTime());
    }
    return [];
}

export function getTotalTransfers(transfers: Transfer[]) {
    if (transfers) {
        return transfers?.length;
    }

    return 0;
}

export function getHighestTransfer(transfers: Transfer[]) {
    if (transfers) {
        const highestTransfer = transfers.reduce((max, transfer) => transfer?.value > max?.value ? transfer : max, transfers[0]);

        return highestTransfer?.value;
    }

    return 0;
}

export function getAverageTransfers(transfers: Transfer[]) {
    if (transfers) {
        const totalTransfers = transfers?.length;
        const sumTransfers = transfers.reduce((total, transfer) => total + Number(transfer?.value), 0);

        const averageTransfers = Number(sumTransfers) / totalTransfers;

        return averageTransfers;

    }

    return 0;
}

export const handleCurrencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/\D/g, "");

    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(Number(inputValue) / 100);

    return formatted;
};