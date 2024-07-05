export interface ICourseQueryParameters {
    instructorId: string | null,
    filterOn: string,
    filterQuery: string,
    sortBy: string,
    pageSize: number,
    pageNumber: number,
    isAscending: boolean,
}

