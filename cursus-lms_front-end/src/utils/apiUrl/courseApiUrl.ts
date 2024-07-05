import {ICourseQueryParameters} from "../../types/course.types.ts";

export const COURSES_URL = {
    GET_ALL_COURSES:
        (
            query: ICourseQueryParameters
        ) => {
            return `/Course?instructorId=${query.instructorId}&filterOn=${query.filterOn}&filterQuery=${query.filterQuery}&sortBy=${query.sortBy}&isAscending=${query.isAscending}&fromPrice=${query.fromPrice}&toPrice=${query.toPrice}&pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`
        },
    CREATE_COURSE_VERSION:
        () => {
            return `/CourseVersion/create-course-version`;
        }
}