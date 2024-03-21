import { Navigate, Outlet} from "react-router-dom";
import { useAppSelector } from "../api/hooks";

export default function RequireAuthentication() {

    const auth = useAppSelector(state => state.auth.auth);

    return (
        <>
        {
            auth ? <Outlet/> : 
            <Navigate to='/login'/>
        }
        </>
    )
}