import App from "@/App";
import { createBrowserRouter } from "react-router";
import AuthPage from "./AuthPage";
import ProtectedRoute from "@/lib/providers/ProtectedRouter";
import HomePage from "./HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: AuthPage },
            {
                Component: ProtectedRoute,
                children: [
                    {
                        path: '/home',
                        Component: HomePage
                    }
                ]
            }
        ]
    },
]);

export default router;