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
    parentId: string;
    parentName?: string | null
    createBy: string;
    createTime: Date;
    updateBy: string;
    updateTime: Date;
    status: number;
    statusDescription: string
    subCategories: IAdminCategoryDTO[];
}

export interface IAddCategoryDTO {
    name: string;
    description?: string | null;
    parentId: string | 'root'
}
export interface IUpdateCategoryDTO {
    id: string
    name: string;
    description?: string | null;
    parentId: string | 'root'
    status: number
}