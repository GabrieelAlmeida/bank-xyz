import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Login } from "./pages/Login";

export const routes = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path="login" index element={<Login />} />
    </Route>
));