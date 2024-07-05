import {IQueryParameters} from "../../types/level.types.ts";

export const LEVEL_URL = {
    GET_ALL_LEVELS:
        (
            query: IQueryParameters | null
        ) => {
            if (query != null) {
                return `/Level?filterOn=${query.filterOn}&filterQuery=${query.filterQuery}&sortBy=${query.sortBy}&isAscending=${query.isAscending}&pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`
            }
            return `/Level`
        }
}