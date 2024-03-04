import axios from "axios"
import { toast } from "react-toastify"

const baseURL = import.meta.env.VITE_BASEURL

const axiosInstance = axios.create({
    baseURL
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

axiosInstance.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem("token")
        if (window.location.pathname !== "/giris") {
            window.location.href = "/giris"
        }
        toast.error(error.response.data?.message, {
            autoClose: 2000
        })

    }
    /*  else if (error.response.status === 403) {
         window.location.href = "/anasayfa"
         toast.error(error.response.data.message,{
             autoClose : 1000
         })
     } */
    else {
        return Promise.reject(error)
    }

})

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

export { axiosInstance, fetcher }