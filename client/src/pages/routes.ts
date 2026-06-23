import App from "@/App";
import { createBrowserRouter } from "react-router";
import AuthPage from "./AuthPage";
import ProtectedRoute from "@/lib/providers/ProtectedRouter";
import HomePage from "./HomePage";
import ForgotPasswordPage from "./ForgotPassword";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: AuthPage },
            { path: '/forgot-password', Component: ForgotPasswordPage },
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