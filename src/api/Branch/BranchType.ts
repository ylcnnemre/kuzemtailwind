import { IUserData } from "../User/userType"

export interface IBranch {
    _id: string
    name: string
    description: string
    createdAt: string
    updatedAt: string
    createdByUser: IUserData[]
    uptadedByUser: IUserData[]
}

export interface ICreateBranch {
    name: string
    description: string
}


export interface IUpdateBranchRequest {
    id: string
    name: string
    description: string
}