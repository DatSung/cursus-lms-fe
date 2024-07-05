import {IQueryParameters} from "../../types/category.types.ts";

// CATEGORIES ROUTES

export const CATEGORIES_URL = {
    GET_ALL_CATEGORIES_URL:
        (
            query: IQueryParameters
        ) => {
            return `/Category?filterOn=${query.filterOn}&filterQuery=${query.filterQuery}&sortBy=${query.sortBy}&isAscending=${query.isAscending}&pageNumber=${query.pageNumber > 0 ? query.pageNumber : 1}&pageSize=${query.pageSize > 0 ? query.pageSize : 10}`
        },
    SEARCH_CATEGORIES_URL:
        (
            query: IQueryParameters | null,
        ) => {
            if (query != null) {
                return `/Category/search?filterOn=${query.filterOn}&filterQuery=${query.filterQuery}&sortBy=${query.sortBy}&isAscending=${query.isAscending}&pageNumber=${query.pageNumber > 0 ? query.pageNumber : 1}&pageSize=${query.pageSize > 0 ? query.pageSize : 10}`
            }
            return `/Category/search`
        },
    GET_SUB_CATEGORIES_URL:
        (
            id: string | null
        ) => {
            return `/Category/get-sub-category/${id}`
        },
    GET_PARENT_CATEGORIES_URL:
        (
            id: string | null
        ) => {
            return `/Category/get-parent-category/${id}`
        },
    GET_POST_PUT_DELETE_CATEGORY_URL:
        (
            id: string | null
        ) => {
            return `/Category${id ? `/${id}` : ''}`
        }
}