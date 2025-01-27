import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";

export const routes = createBrowserRouter(createRoutesFromElements(
    <Route errorElement={<NotFound />}>
        <Route path="login" index element={<Login />} />
    </Route>
));