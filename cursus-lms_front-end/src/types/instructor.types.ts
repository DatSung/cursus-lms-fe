export interface IQueryParameters {
    filterOn: string,
    filterQuery: string,
    sortBy: string,
    isAscending: boolean,
    pageNumber: number,
    pageSize: number
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