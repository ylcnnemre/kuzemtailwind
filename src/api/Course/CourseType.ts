import { IUserData } from "../User/userType"

export interface ICourseType {
    _id: string
    branch: {
        _id: string
        name: string
        description: string
        createdBy: any
        updatedBy: any
        createdAt: string
        updatedAt: string
    },
    createdAt: string
    updatedAt: string
    description: string
    schedules: {
        day: string
        endTime: string
        startTime: string
        createdAt: string
        updatedAt: string
        dates: string[]
        _id: string
    }[]
    endDate: string
    files: Array<IFiles>
    quota: number
    startDate: string
    teacher: IUserData
    title: string
    semester: {
        active: boolean,
        description: string
        name: string
        period: string
        year: number
        _id: string
        createdAt: string
        updatedAt: string
    },
    active: "aktif" | "pasif"
    joinUserList?: any[]
    announcement: {
        _id: string
        content: string
        title: string
        createdAt: string
        updatedAt: string
        createdBy: IUserData
    }[]
}

export interface ICourseUpdateType {
    courseId: string
    branch: string
    description: string
    endDate: string
    quota: number
    startDate: string
    teacher: string
    title: string
}


export interface IFiles {
    _id: string
    path: string
    name: string
    extension: string
    createdBy: {
        _id: string
        name: string
        surname: string
    },
    type: "photo" | "document"
    createdAt: string
    updatedAt: string
}

export interface IDeletePhoto {
    imgName: string
    courseId: string
    imgId: string
}

export interface IDeleteDocument {
    documentName: string
    courseId: string
    documentId: string
}

export interface IUpdateCourseProgram {
    courseId: string
    programs: {
        day: string
        endTime: string
        startTime: string
    }[]
}

export interface ICreateAnnouncement {
    courseId: string
    title: string
    content: string
}


export interface IUpdateAnnouncement {
    courseId: string
    announcementId: string
    title: string
    content: string
}

export interface IDeleteAnnouncement {
    courseId: string
    announcementId: string
}