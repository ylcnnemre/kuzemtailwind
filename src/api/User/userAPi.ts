import axios, { AxiosResponse } from "axios"
import { axiosInstance } from "../axiosInstance"
import { ICreateUserType, IUpdateUserType, IUserCourseResponse, IUserData } from "./userType"

const createUserApi = (data: ICreateUserType) => axiosInstance.post("/user/register", data)

const getUserByIdApi = async (id: string): Promise<AxiosResponse<IUserData>> => axiosInstance.get(`/user/${id}`)

const updateUserApi = async (data: IUpdateUserType) => axiosInstance.put("/user/update", data)

const uploadProfileImgApi = async (data: any): Promise<AxiosResponse<IUserData["profileImg"]>> => axiosInstance.post("/user/upload/profile", data)

const deleteUserApi = (id: string) => axiosInstance.delete(`/user/${id}`)

const getTeacherListApi = (id: string): Promise<AxiosResponse<any[]>> => axiosInstance.get(`/user/teacher/branch/${id}`)

const getStudentListApi = (): Promise<AxiosResponse<IUserData[]>> => axiosInstance.get("/user/all/student")

const getAdminListApi = () => axiosInstance.get("/user/all/admin")

const getStudentCourseApi = (id: string): Promise<AxiosResponse<IUserCourseResponse[]>> => axiosInstance.get(`/user/enrollmentcourse/${id}`) //öğrencinin katıldığı kursları getirir

const createStudentApi = (data: ICreateUserType) => axiosInstance.post("/user/student", data)

export {
    getUserByIdApi,
    uploadProfileImgApi,
    getTeacherListApi,
    updateUserApi,
    createUserApi,
    deleteUserApi,
    getStudentListApi,
    getAdminListApi,
    getStudentCourseApi,
    createStudentApi
}