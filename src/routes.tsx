import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";

export const routes = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route index element={<App />} />
    </Route>
));