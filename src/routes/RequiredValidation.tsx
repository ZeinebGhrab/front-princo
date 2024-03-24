import { Navigate, useLocation} from "react-router-dom";
import Verify from "./Verify";
import ResetPassword from "../components/password/ResetPassword";
import { useEffect } from "react";

export default function RequireValidation() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    useEffect(()=>{
     console.log(token, email)
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