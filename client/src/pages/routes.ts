import App from "@/App";
import { createBrowserRouter } from "react-router";
import HomePage from "./HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: false, Component: HomePage, path: '/home' }
        ]
    },
]);

export default router;