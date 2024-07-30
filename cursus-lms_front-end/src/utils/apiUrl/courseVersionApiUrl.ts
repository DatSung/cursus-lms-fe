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
            return `/CourseVersion/clone`
        },
    REMOVE_COURSE_VERSION:
        (
            courseId: string | null
        ) => {
            return `/CourseVersion/remove/${courseId}`
        },
    SUBMIT_COURSE_VERSION:
        (
            courseId: string | null
        ) => {
            return `/CourseVersion/submit/${courseId}`
        },
    MERGE_COURSE_VERSION:
        (
            courseId: string | null
        ) => {
            return `/CourseVersion/merge/${courseId}`
        },
    EDIT_COURSE_VERSION:
        () => {
            return `/CourseVersion/edit`
        },
    GET_COURSE_SECTION_VERSIONS:
        (
            query: ICourseSectionVersionsQueryParametersDTO
        ) => {
            return `/CourseVersion/section?courseVersionId=${query.courseVersionId}&filterOn=${query.filterOn}&filterQuery=${query.filterQuery}&sortBy=${query.sortBy}&pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`
        },
    GET_DELETE_COURSE_SECTION_VERSION:
        (
            sectionId: string
        ) => {
            return `/CourseVersion/section${sectionId != null ? `/${sectionId}` : ''}`
        },
    CREATE_COURSE_SECTION_VERSION:
        () => {
            return `/CourseVersion/section`
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
    POST_DETAILS_CONTENT_VERSION:
        (
            detailVersionId: string | null
        ) => {
            return `/CourseVersion/section/details/content/${detailVersionId}`
        },
    GET_DETAILS_CONTENT_VERSION:
        (
            detailsVersionId: string | null | undefined,
            userId: string | undefined,
            type: string | null
        ) => {
            return `/CourseVersion/section/details/content?sectionDetailsVersionId=${detailsVersionId}&userId=${userId}&type=${type}`
        },
    UP_DIS_COURSE_VERSION_BACKGROUND:
        (
            courseVersionId: string | null
        ) => {
            return `/CourseVersion/background/${courseVersionId}`
        }
}
