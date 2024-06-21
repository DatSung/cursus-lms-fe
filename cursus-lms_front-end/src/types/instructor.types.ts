export interface IQueryParameters {
    filterOn: string,
    filterQuery: string,
    sortBy: string,
    isAscending: boolean,
    pageNumber: number,
    pageSize: number
}

export interface IInstructorDTO {
    instructorId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    birthDate: Date;
    isAccepted: boolean;
}

export interface IInstructorTotalCountDTO {
    total: number
}