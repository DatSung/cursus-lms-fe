import useAuth from "../hooks/useAuth.hook.ts";
import Spinner from "../components/general/Spinner.tsx";
import {Navigate, Outlet} from "react-router-dom";
import {PATH_PUBLIC} from "../routes/paths.ts";

// Interface for props
// Receive a roles array to decide next step
interface IProps {
    roles: string[];
}

const AuthGuard = ({roles}: IProps) => {

    const {isAuthenticated, user, isAuthLoading} = useAuth();

    // Check access to decide which component will be rendered.
    const hasAccess = isAuthenticated && user?.roles?.find(x => roles.includes(x))

    if (isAuthLoading) {
        return <Spinner></Spinner>;
    }

    return hasAccess ? <Outlet></Outlet> : <Navigate to={PATH_PUBLIC.unauthorized}></Navigate>;

};

export default AuthGuard;