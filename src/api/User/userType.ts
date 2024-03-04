
import { Permission } from "../../common/constant"
import { ICourseType } from "../Course/CourseType"


export interface IJwtDecode {
    _id: string,
    name: string,
    surname: string
    email: string
    role: "student" | "teacher" | "admin" | "superadmin"
    permission: Permission[]
    iat: string
    exp: string
}

export interface IUserData {
    _id: string
    name: string
    surname: string
    email: string
    gender: "erkek" | "kadın",
    phone: string
    role: string
    tcNo: string
    birthDate: string,
    branch?: any
    courses: ICourseType[],
    address?: {
        _id: string
        city: string
        createdAt: string
        updatedAt: string
        postalCode: string
        additionalInfo: string
        region: string
    },
    profileImg?: {
        path: string
        name: string
        extension: string
        type: string
        _id: string
        createdAt: string
        createdBy: any
        updatedAt: string
    },
    permission: Permission[]
    responsibleCourse?: any[]

}



export interface ICreateUserType {
    name: string,
    surname: string
    password?: string
    tcNo: string,
    email: string
    role: string
    phone: string
    birthDate: string
    gender: "erkek" | "kadın",
    branch?: string,
    permission?: Permission[],
    userId?: string
}



export interface IUpdateUserType {
    _id: string
    name: string,
    surname: string
    birthDate: string
    gender: string,
    branch?: string,
    address?: {
        city: string
        region: string
        postalCode: number
        additionalInfo: string
    },
    permission?: string[]
}


export interface IUserCourseResponse {  // öğrencinin aldığı kursları tanımlayan interface
    _id: string
    user: string
    course: ICourseType
    createdAt: string
    updatedAt: string
}