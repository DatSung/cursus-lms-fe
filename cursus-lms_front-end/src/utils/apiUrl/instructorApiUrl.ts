import {IPagingParameters, IQueryParameters} from "../../types/instructor.types.ts";

// INSTRUCTORS ROUTES

export const INSTRUCTORS_URL = {
    GET_ALL_INSTRUCTORS_URL:
        (
            query: IQueryParameters
        ) => {
            return `/Instructor?filterOn=${query.filterOn}&filterQuery=${query.filterQuery}&sortBy=${query.sortBy}&isAscending=${query.isAscending}&pageNumber=${query.pageNumber > 0 ? query.pageNumber : 1}&pageSize=${query.pageSize > 0 ? query.pageSize : 10}`
        },
    GET_PUT_INSTRUCTOR_URL:
        (
            instructorId: string | null
        ) => {
            return `/Instructor${instructorId ? `/${instructorId}` : ''}`
        },
    GET_TOTAL_COURSES_INSTRUCTOR_URL:
        (
            instructorId: string | null
        ) => {
            return `/Instructor/total-courses${instructorId ? `/${instructorId}` : ''}`
        },
    GET_TOTAL_RATING_INSTRUCTOR_URL:
        (
            instructorId: string | null
        ) => {
            return `/Instructor/total-rating${instructorId ? `/${instructorId}` : ''}`
        },
    GET_TOTAL_EARNED_MONEY_INSTRUCTOR_URL:
        (
            instructorId: string | null
        ) => {
            return `/Instructor/total-earned-money${instructorId ? `/${instructorId}` : ''}`
        },
    GET_TOTAL_PAYOUT_MONEY_INSTRUCTOR_URL:
        (
            instructorId: string | null
        ) => {
            return `/Instructor/total-payout-money${instructorId ? `/${instructorId}` : ''}`
        },
    ACCEPT_INSTRUCTOR_URL:
        (
            instructorId: string | null
        ) => {
            return `/Instructor/accept/${instructorId}`
        },
    REJECT_INSTRUCTOR_URL:
        (
            instructorId: string | null
        ) => {
            return `/Instructor/reject/${instructorId}`
        },
    GET_ALL_COMMENT_INSTRUCTOR_URL:
        (
            instructorId: string | null,
            query: IPagingParameters
        ) => {
            return `/Instructor/comment/${instructorId}?pageNumber=${query.pageNumber > 0 ? query.pageNumber : 1}&pageSize=${query.pageSize ? query.pageSize : 10}`
        },
    POST_PUT_DELETE_COMMENT_INSTRUCTOR_URL:
        (
            commentId: string | null
        ) => {
            return `/Instructor/comment${commentId != null ? `/${commentId}` : ''}`
        },
    EXPORT_INSTRUCTORS_URL:
        (
            month: number,
            year: number
        ) => {
            return `/Instructor/export/${month}/${year}`
        },
    DOWNLOAD_INSTRUCTORS_URL:
        (
            fileName: string
        ) => {
            return `/Instructor/download/${fileName}`
        },
}