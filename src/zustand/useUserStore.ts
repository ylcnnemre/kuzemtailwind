import { create } from 'zustand'
import { jwtDecode } from "jwt-decode"
import { IJwtDecode } from '../api/User/userType';



interface UserState {
    user: Omit<IJwtDecode, "iat" | "exp">;
    isLoggedIn: boolean,
    setUser: (data: Omit<IJwtDecode, "iat" | "exp">) => void;
    loginSuccess: (user: any, navigate: any) => void;
    logoutUserSuccess: () => void;
}

const decodeToken = () => {
    const { iat, exp, ...rest } = jwtDecode<IJwtDecode>(JSON.stringify(localStorage.getItem("token")))
    return rest
}

const useUserStore = create<UserState>((set) => ({
    user: localStorage.getItem("token") ? decodeToken() : {
        _id: "",
        email: "",
        name: "",
        role: "admin",
        surname: "",
        permission: []
    },
    isLoggedIn: localStorage.getItem("token") ? true : false,
    setUser: (data) => {
        set(() => ({
            user: data
        }))
    },

    loginSuccess: (token, navigate) => {
        console.log("tokenn ==>", token)
        localStorage.setItem("token", token.accessToken)
        const decodeJwt: IJwtDecode = jwtDecode(JSON.stringify(token.accessToken))
        const { iat, exp, ...restDecode } = decodeJwt
        set(() => ({
            user: restDecode,
            isLoggedIn: true
        }))
        navigate("/dashboard")
    },
    logoutUserSuccess: () => {
        localStorage.removeItem("token")
        set(() => ({
            isLoggedIn: false
        }))
    },

}));

export default useUserStore;
