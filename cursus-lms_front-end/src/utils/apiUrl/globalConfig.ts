// HOST API URL
import {IQueryParameters} from "../../types/category.types.ts";
import {IPagingParameters} from "../../types/instructor.types.ts";

export const HOST_API_KEY = "https://localhost:7554/api";

// AUTH API URLS
export const SIGN_UP_STUDENT_URL = "/Auth/sign-up-student";
export const SIGN_UP_INSTRUCTOR_URL = "/Auth/sign-up-instructor";
export const UPLOAD_INSTRUCTOR_DEGREE_URL = "/Auth/upload-instructor-degree";
export const GET_INSTRUCTOR_DEGREE_URL = "/Auth/get-instructor-degree";
export const UPLOAD_USER_AVATAR_URL = "/Auth/upload-user-avatar";
export const GET_USER_AVATAR_URL = "/Auth/get-user-avatar";
export const FORGOT_PASSWORD_URL = "/Auth/forgot-password";
export const RESET_PASSWORD_URL = "/Auth/reset-password";
export const SEND_VERIFY_EMAIL_URL = "/Auth/send-verify-email";
export const VERIFY_EMAIL_URL = "/Auth/verify-email";
export const CHANGE_PASSWORD_URL = "/Auth/change-password";
export const SIGN_IN_URL = "/Auth/sign-in";
export const SIGN_IN_BY_GOOGLE_URL = "/Auth/sign-in-by-google";
export const COMPLETE_STUDENT_PROFILE_URL = "/Auth/complete-student-profile";
export const COMPLETE_INSTRUCTOR_PROFILE_URL = "/Auth/complete-instructor-profile";
export const REFRESH_URL = "/Auth/refresh";
export const GET_USER_INFO_URL = "/Auth/get-user-info";
export const CHECK_EMAIL_EXIST_URL = "/Auth/check-email-exist";
export const CHECK_PHONE_NUMBER_EXIST_URL = "/Auth/check-phone-number-exist";
export const UPDATE_STUDENT_PROFILE_URL = "/Auth/update-student-profile";
export const UPDATE_INSTRUCTOR_PROFILE_URL = "/Auth/update-instructor-profile";
export const DISPLAY_USER_AVATAR_URL = "/Auth/display-user-avatar/"
export const DISPLAY_INSTRUCTOR_DEGREE_URL = "/Auth/display-instructor-degree/"
// AUTH ROUTES

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
            query: IQueryParameters
        ) => {
            return `/Category/search?filterOn=${query.filterOn}&filterQuery=${query.filterQuery}&sortBy=${query.sortBy}&isAscending=${query.isAscending}&pageNumber=${query.pageNumber > 0 ? query.pageNumber : 1}&pageSize=${query.pageSize > 0 ? query.pageSize : 10}`
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
    POST_PUT_DELETE_CATEGORY_URL:
        (
            id: string | null
        ) => {
            return `/Category${id ? `/${id}` : ''}`
        }
}

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
        (instructorId: string | null) => {
            return `/Instructor/accept/${instructorId}`
        },
    REJECT_INSTRUCTOR_URL:
        (instructorId: string | null) => {
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
        (commentId: string | null) => {
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