import { DollarSign } from "lucide-react";
import financialBackgroundLogo from "../../assets/financial-login.svg";

export function Logo() {
    return(
        <div className="w-[50vw] h-screen bg-brand-dark-background-200  p-6 flex flex-col gap-10">
            <div className="flex text-brand-purple-100 font-semibold">
                <DollarSign />
                <h1> Bank XYZ</h1>
            </div>
            <img src={financialBackgroundLogo} className="justify-center "alt="Bank XYZ financial background Logo"/>
        </div>
    );
}