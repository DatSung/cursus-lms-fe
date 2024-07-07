import {
    ICourseSectionVersionsQueryParametersDTO,
    ICourseVersionsQueryParametersDTO, ISectionDetailsVersionsQueryParametersDTO
} from "../../types/courseVersion.types.ts";

export const COURSE_VERSIONS_URL = {
    GET_COURSE_VERSIONS:
        (
            query: ICourseVersionsQueryParametersDTO
        ) => {
            return `/CourseVersion?courseId=${query.courseId}&filterOn=${query.filterOn}&filterQuery=${query.filterQuery}&sortBy=${query.sortBy}&pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`
        },
    GET_COURSE_VERSION:
        (
            courseVersionId: string | null
        ) => {
            return `/CourseVersion/${courseVersionId}`
        },
    CLONE_COURSE_VERSION:
        () => {
            return `/CourseVersion/clone-course-version`
        },
    REMOVE_COURSE_VERSION:
        (
            courseId: string | null
        ) => {
            return `/CourseVersion/remove-course-version/${courseId}`
        },
    SUBMIT_COURSE_VERSION:
        (
            courseId: string | null
        ) => {
            return `/CourseVersion/submit-course-version/${courseId}`
        },
    MERGE_COURSE_VERSION:
        (
            courseId: string | null
        ) => {
            return `/CourseVersion/merge-course-version/${courseId}`
        },
    EDIT_COURSE_VERSION:
        () => {
            return `/CourseVersion/edit-course-version`
        },
    GET_COURSE_SECTION_VERSIONS:
        (
            query: ICourseSectionVersionsQueryParametersDTO
        ) => {
            return `/CourseVersion/section?courseVersionId=${query.courseVersionId}&filterOn=${query.filterOn}&filterQuery=${query.filterQuery}&sortBy=${query.sortBy}&pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`
        },
    CREATE_COURSE_SECTION_VERSION:
        () => {
            return `/CourseVersion/create-course-section-version`
        },
    GET_SECTION_DETAILS_VERSIONS:
        (
            query: ISectionDetailsVersionsQueryParametersDTO
        ) => {
            return `/CourseVersion/section/details?courseSectionId=${query.courseSectionId}&filterOn=${query.filterOn}&filterQuery=${query.filterQuery}&sortBy=${query.sortBy}&pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`
        },
    GET_POST_PUT_DELETE_SECTION_DETAILS_VERSION:
        (
            detailsId: string | null
        ) => {
            return `/CourseVersion/section/details${detailsId != null ? `/${detailsId}` : ''}`
        },
    GET_POST_DETAILS_CONTENT_VERSION:
        () => {
            return `/CourseVersion/section/details/content`
        },
}
