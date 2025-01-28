import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthLayout } from "./pages/Layouts/Auth";
import { DashboardLayout } from "./pages/Layouts/Dashboard";

export const routes = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<AuthLayout />} errorElement={<NotFound />}>
            <Route path="login" index element={<Login />} />
        </Route>

        <Route path="/" element={<DashboardLayout />} errorElement={<NotFound />} >
            <Route path="dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
        </Route>
    </>
));