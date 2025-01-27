import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="text-accent-foreground">
        Back to{" "}
        <Link to="login" className="text-brand-purple-100">
          Login
        </Link>
      </p>
    </div>
  );
}
