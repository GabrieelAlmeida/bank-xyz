import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthLayout } from "./pages/Layouts/Auth";
import { DashboardLayout } from "./pages/Layouts/Dashboard";
import { Transfers } from "./pages/Transfers";
import { NewTransfer } from "./pages/NewTransfer";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AuthLayout />} errorElement={<NotFound />}>
        <Route index element={<Navigate to="/login" />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="/" element={<DashboardLayout />} errorElement={<NotFound />}>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="transfers"
          element={
            <ProtectedRoute>
              <Transfers />
            </ProtectedRoute>
          }
        />

        <Route
          path="new-transfer"
          element={
            <ProtectedRoute>
              <NewTransfer />
            </ProtectedRoute>
          }
        />
      </Route>
    </>,
  ),
);
