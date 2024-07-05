// EMAIL TEMPLATES ROUTES
export const EMAIL_TEMPLATES_URL = {
    GET_PUT_EMAILS:
        (
            emailId: string | null
        ) => {
            return `/EmailTemplate${emailId ? `/${emailId}` : ''}`
        }
}