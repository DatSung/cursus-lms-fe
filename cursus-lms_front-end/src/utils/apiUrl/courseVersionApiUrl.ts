import {ICourseVersionsQueryParametersDTO} from "../../types/courseVersion.types.ts";

export const COURSE_VERSIONS_URL = {
    GET_COURSE_VERSIONS:
        (
            query: ICourseVersionsQueryParametersDTO
        ) => {
            return `/CourseVersion?courseId=${query.courseId}&filterOn=${query.filterOn}&filterQuery=${query.filterQuery}&sortBy=${query.sortBy}&pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`
        },

}
