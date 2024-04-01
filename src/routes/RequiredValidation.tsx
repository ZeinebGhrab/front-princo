import { Navigate, useLocation} from "react-router-dom";
import Verify from "../components/sign/Verify";
import ResetPassword from "../components/login/ResetPassword";
import { useEffect } from "react";

export default function RequireValidation() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    useEffect(()=>{
   },[email, token])

    return (
        <>
        {
            token ? <Verify token={token}/> : (
                email? <ResetPassword email={email}/> : <Navigate to='/login'/>
            )
        }
        </>
    )
}