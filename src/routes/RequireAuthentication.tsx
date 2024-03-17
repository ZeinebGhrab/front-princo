import { Navigate, Outlet} from "react-router-dom";

export default function RequireAuthentication() {

    const auth = true;
    return (
        <>
        {
            auth ? <Outlet/> : 
            <Navigate to='/login'/>
        }
        </>

    )

}