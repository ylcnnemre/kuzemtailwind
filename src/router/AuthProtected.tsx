import React, { useEffect } from "react";
import useUserStore from "../zustand/useUserStore";
import { useNavigate, Navigate } from "react-router-dom";


const AuthProtected = (props: any) => {
    const { isLoggedIn, user } = useUserStore()
    if (true) {
        return <>{props.children}</>;
    }
    else {
        return <Navigate to={"/giris"} />
    }

};


export default AuthProtected;
