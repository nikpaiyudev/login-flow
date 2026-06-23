import { Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import type { JSX } from "react/jsx-runtime";


/**
 * A protected route component that restricts access to authenticated users only.
 * Redirects unauthenticated users to the root path ('/') and renders child routes
 * via the Outlet component if the user is logged in.
 * @component
 * @returns {JSX.Element} Renders the child route's element if authenticated, otherwise redirects.
 */
export default function ProtectedRoute(): JSX.Element {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    if (!isLoggedIn) {
        navigate('/');
    }

    return <Outlet />
}