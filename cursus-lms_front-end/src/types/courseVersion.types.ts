export interface ICourseVersionsQueryParametersDTO {
    courseId: string;
    filterOn: string,
    filterQuery: string,
    sortBy: string,
    isAscending: boolean,
    pageNumber: number,
    pageSize: number
}

export interface ICourseVersionDTO {
    id: string,
    courseId: string,
    title: string,
    code: string,
    description: string,
    learningTime: string,
    price: string,
    oldPrice: string,
    courseImgUrl: string,
    instructorId: string,
    instructorEmail: string,
    categoryId: string,
    categoryName: string,
    levelId: string,
    levelName: string,
    currentStatus: string,
    currentStatusDescription: string
}