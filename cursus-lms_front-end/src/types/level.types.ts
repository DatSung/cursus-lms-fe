export interface IQueryParameters {
    filterOn: string,
    filterQuery: string,
    sortBy: string,
    isAscending: boolean,
    pageNumber: number,
    pageSize: number
}

export interface ILevelDTO {
    id:string,
    name: string,
    createBy: string,
    createTime: Date,
    updateBy: string,
    updateTime: string,
    status: number
}