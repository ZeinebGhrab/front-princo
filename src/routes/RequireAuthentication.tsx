import { Navigate, Outlet} from "react-router-dom";
import { useAppSelector } from "../api/hooks";

export default function RequireAuthentication() {

    const token = useAppSelector(state => state.auth.data?.token);
    const auth = useAppSelector(state => state.auth.auth);

    return (
        <>
        {
            token && auth ? <Outlet/> : 
            <Navigate to='/login'/>
        }
        </>
    )
}