import { useEffect, useState } from "react";
import { TransferListResponse } from "../interfaces/account.interface";
import accountService from "../services/account.service";
import { toast } from "react-toastify";

function useFetchTransferList() {
    const [transferList, setTransferList] = useState<TransferListResponse | null>();

    async function handleGetTransferList() {
        try {
            const transferListResponse: TransferListResponse = await accountService.account.getTransferList();
            if(transferListResponse) {
                setTransferList(transferListResponse);
            }
            
        } catch (error) {
            toast.error("Error when fetching transfer list");
        }
    }

    useEffect(()=> {
        handleGetTransferList();
    }, []);


    return { transferList };
    
}

export default useFetchTransferList;