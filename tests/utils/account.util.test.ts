import { ChangeEvent } from "react";
import {
    formatCurrency,
    formatTransfersToGraphList,
    getTotalTransfers,
    getHighestTransfer,
    getAverageTransfers,
    handleCurrencyChange,
    handleCurrencyToInteger
} from "../../src/utils/account.util";
import { Transfer, TransferListResponse } from "../../src/interfaces/account.interface";

describe("Utility functions", () => {
    describe("formatCurrency", () => {
        it("formats the balance as currency", () => {
            expect(formatCurrency(1234.56, "USD")).toBe("$1,234.56");
            expect(formatCurrency(1234.56, "EUR")).toBe("€1,234.56");
        });
    });

    describe("formatTransfersToGraphList", () => {
        it("formats and sorts transfers list", () => {
            const transfersList: TransferListResponse = {
                transfers: [
                    { value: 100, date: "2023-01-01", currency: "", payeer: { document: "", name: "" } },
                    { value: 200, date: "2023-01-02", currency: "", payeer: { document: "", name: "" } }
                ],
                message: ""
            };
            const result = formatTransfersToGraphList(transfersList);
            expect(result).toEqual([
                { value: 100, date: "2023-01-01" },
                { value: 200, date: "2023-01-02" }
            ]);
        });
    });

    describe("getTotalTransfers", () => {
        it("returns the total number of transfers", () => {
            const transfers: Transfer[] = [
                { value: 100, date: "2023-01-01", currency: "", payeer: { document: "", name: "" } },
                { value: 200, date: "2023-01-02", currency: "", payeer: { document: "", name: "" } }
            ];
            expect(getTotalTransfers(transfers)).toBe(2);
        });
    });

    describe("getHighestTransfer", () => {
        it("returns the highest transfer value", () => {
            const transfers: Transfer[] = [
                { value: 100, date: "2023-01-01", currency: "", payeer: { document: "", name: "" } },
                { value: 200, date: "2023-01-02", currency: "", payeer: { document: "", name: "" } }
            ];
            expect(getHighestTransfer(transfers)).toBe(200);
        });
    });

    describe("getAverageTransfers", () => {
        it("returns the average transfer value", () => {
            const transfers: Transfer[] = [
                { value: 100, date: "2023-01-01", currency: "", payeer: { document: "", name: "" } },
                { value: 200, date: "2023-01-02", currency: "", payeer: { document: "", name: "" } }
            ];
            expect(getAverageTransfers(transfers)).toBe(150);
        });
    });

    describe("handleCurrencyChange", () => {
        it("formats input value as currency", () => {
            const event = {
                target: { value: "1234" }
            } as ChangeEvent<HTMLInputElement>;
            expect(handleCurrencyChange(event)).toBe("$12.34");
        });
    });

    describe("handleCurrencyToInteger", () => {
        it("converts currency string to integer", () => {
            expect(handleCurrencyToInteger("$1,234.56")).toBe(123456);
        });
    });
});