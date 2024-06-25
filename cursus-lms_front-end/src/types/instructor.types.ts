export interface IQueryParameters {
    filterOn: string,
    filterQuery: string,
    sortBy: string,
    isAscending: boolean,
    pageNumber: number,
    pageSize: number
}

export interface IPagingParameters {
    pageSize: number
    pageNumber: number
}

export interface IInstructorInfoLiteDTO {
    instructorId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    birthDate: Date;
    isAccepted: boolean;
}

export interface IEditInstructorInfoDTO {
    instructorId: string
    introduction: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    gender: string,
    birthDate: Date,
    country: string,
    address: string,
    degree: string,
    industry: string,
    taxNumber: string,
}

export interface IInstructorInfoDTO {
    instructorId: string;
    userId: string;
    avatarUrl: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    birthDate: Date;
    country: string;
    address: string;
    degree: string;
    industry: string;
    introduction: string;
    taxNumber: string;
    isAccepted: boolean;
}

export interface IInstructorTotalCountDTO {
    total: number
}

export interface IInstructorComment {
    id: string,
    comment: string,
    createTime: Date,
    createBy: string,
    updateTime: Date,
    updateBy: string,
    status: number,
    statusDescription: string
}

export interface ICreateComment {
    comment: string | null,
    instructorId: string | null,
}

export interface IUpdateComment {
    id: string | null,
    comment: string | null,
}

export interface ITotalCourses {
    total: number,
    pending: number,
    activated: number,
    rejected: number,
    deleted: number
}

export interface IAvgRating {
    avg: number,
    one: number,
    two: number,
    three: number,
    four: number
    five: number
}