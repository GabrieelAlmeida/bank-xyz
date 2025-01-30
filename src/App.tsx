import { RouterProvider } from "react-router-dom";
import { routes } from "./routes.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routes} />
        </QueryClientProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
