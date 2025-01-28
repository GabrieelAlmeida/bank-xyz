import { DollarSign } from "lucide-react";

export function Logo() {
    return(
        <div className="flex text-brand-purple-100 font-semibold">
            <DollarSign />
            <h1> Bank XYZ</h1>
        </div>
    );
}