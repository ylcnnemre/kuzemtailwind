import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";
import { ICreateBranch, IBranch, IUpdateBranchRequest } from "./BranchType";


const getAllBranch = (): Promise<AxiosResponse<IBranch[]>> => axiosInstance.get("/branch/all")

const createBranch = (data: ICreateBranch): Promise<AxiosResponse<IBranch[]>> => axiosInstance.post("/branch/create", data)

const updateBranchApi = (data: IUpdateBranchRequest): Promise<AxiosResponse<IBranch[]>> => axiosInstance.put("/branch", data)

const deleteBranchApi = (id: string) => axiosInstance.delete(`/branch/${id}`)

export {
    getAllBranch,
    createBranch,
    updateBranchApi,
    deleteBranchApi
}