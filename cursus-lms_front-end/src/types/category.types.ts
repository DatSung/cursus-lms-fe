export interface IQueryParameters {
    filterOn: string,
    filterQuery: string,
    sortBy: string,
    isAscending: boolean,
    pageNumber: number,
    pageSize: number
}

export interface ICategoryDTO {
    id: string;
    name: string;
    description?: string | null;
    subCategories: ICategoryDTO[];
}

export interface IAdminCategoryDTO {
    id: string;
    name: string;
    description?: string | null;
    parentName?:string | null
    createdBy: string;
    createTime: Date;
    updatedBy: string;
    updateTime: Date;
    status: number;
    statusDescription: string
    subCategories: IAdminCategoryDTO[];
}