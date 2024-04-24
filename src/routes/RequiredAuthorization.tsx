import { Outlet } from "react-router-dom";
import { useAppSelector } from "../api/hooks";
import PageNotFound from "./PageNotFound";

export default function RequiredAuthorization(){
    const roles = useAppSelector(state => state.authentication.data?.roles);
    const isAdmin = roles?.includes('admin');

        return(
            <>
            {
                isAdmin ? <Outlet /> : <PageNotFound/>
            }
            </>
        )
    
}