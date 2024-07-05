export interface ICourseQueryParameters {
    instructorId: string | null,
    filterOn: string,
    filterQuery: string,
    sortBy: string,
    isAscending: boolean,
    fromPrice: number | null,
    toPrice: number | null,
    pageSize: number,
    pageNumber: number,
}

export interface IGetAllCoursesDTO {
    id: string;
    courseId: string;
    title:string;
    code: string,
    description: string;
    learningTime: string;
    price: number;
    oldPrice: number;
    courseImgUrl: string;
    instructorId: string;
    categoryId: string;
    categoryName: string;
    levelId: string;
    levelName: string;
    currentStatus: number
    currentStatusDescription: string
}
