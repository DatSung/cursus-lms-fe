export const PATH_PUBLIC = {
    home: '/',
    courses: '/courses',
    signIn: '/user/sign-in',
    completeProfile: '/user/sign-in/complete-profile',
    forgotPassword: '/user/sign-in/forgot-password',
    verifyEmail: '/user/sign-in/verify-email',
    signUpStudent: '/user/sign-up-student',
    signUpInstructor: '/user/sign-up-instructor',
    uploadDegree: '/user/sign-in/upload-degree',
    unauthorized: '/unauthorized',
    notFound: '/404'
}

export const PATH_ADMIN = {
    dashboard: '/admin/dashboard',
    categories: '/admin/services/categories',
    emails: '/admin/services/emails',
    emailsEdit: '/admin/services/emails/edit',
    instructors: '/admin/services/instructors',
    instructorInfo: '/admin/services/instructors/info',
}

export const PATH_INSTRUCTOR = {
    dashboard: '/instructor/dashboard',
    courses: '/instructor/courses',
    courseVersions: '/instructor/courses/versions',
    courseVersionDetails: '/instructor/courses/versions/details',
    sectionVersionDetails: '/instructor/courses/versions/section/details',
}
