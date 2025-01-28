import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const routes = createBrowserRouter(createRoutesFromElements(
    <Route errorElement={<NotFound />}>
        <Route path="login" index element={<Login />} />
        <Route path="dashboard" element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        } />
    </Route>
));