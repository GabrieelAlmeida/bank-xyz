import { useEffect, useState } from "react";
import { BalanceResponse } from "../interfaces/account.interface";
import accountService from "../services/account.service";
import { toast } from "react-toastify";

function useFetchBalance() {
    const [balance, setBalance] = useState<BalanceResponse>();
    async function handleGetBalance() {
        try {
            const balanceResponse: BalanceResponse = await accountService.account.getBalance();
            if(balanceResponse) {
                setBalance(balanceResponse);
            }
            
        } catch (error) {
            toast.error("Error when fetching balance");
        }
    }

    useEffect(()=> {
        handleGetBalance();
    }, []);


    return { balance };
    
}

export default useFetchBalance;