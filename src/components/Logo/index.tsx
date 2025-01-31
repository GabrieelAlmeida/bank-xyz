import { DollarSign } from "lucide-react";

export function Logo() {
  return (
    <div
      data-testid="logo-app"
      className="text-brand-purple-100 flex font-semibold"
    >
      <DollarSign />
      <h1> Bank XYZ</h1>
    </div>
  );
}
