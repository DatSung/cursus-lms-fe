import {Navigate, Route, Routes} from "react-router-dom"
import Layout from "../components/user/layout";
import {PATH_ADMIN, PATH_PUBLIC} from "./paths";
import HomePage from "../pages/home/HomePage.tsx";
import SignInPage from "../pages/authentication/SignInPage.tsx";
import SignUpStudentPage from "../pages/authentication/SignUpStudentPage.tsx";
import CoursesPage from "../pages/courses/CoursesPage";
import NotFoundPage from "../pages/public/NotFoundPage";
import ForgotPasswordPage from "../pages/authentication/ForgotPasswordPage.tsx";
import VerifyEmailPage from "../pages/authentication/VerifyEmailPage.tsx";
import SignUpInstructor from "../pages/authentication/SignUpInstructor.tsx";
import UploadDegreeInstructor from "../pages/user/UploadDegreeInstructor.tsx";
import CompleteProfile from "../pages/authentication/CompleteProfile.tsx";
import AdminLayout from "../components/admin/layout";
import DashboardPage from "../pages/admin/dashboard/DashboardPage.tsx";
import AuthGuard from "../auth/AuthGuard.tsx";
import {RolesEnum} from "../types/auth.types.ts";
import UnauthorizedPage from "../pages/public/UnauthorizedPage.tsx";
import CategoriesPage from "../pages/admin/services/categories/CategoriesPage.tsx";
import InstructorsPage from "../pages/admin/services/instructors/InstructorsPage.tsx";
import InstructorInfoPage from "../pages/admin/services/instructors/InstructorInfoPage.tsx";
import EmailsTable from "../components/admin/services/emails/EmailsTable.tsx";

const GlobalRouter = () => {
    return (
        <Routes>
            <Route element={<Layout/>}>

                {/* Public routes */}
                <Route index element={<HomePage></HomePage>}/>
                <Route path={PATH_PUBLIC.signIn} element={<SignInPage></SignInPage>}/>
                <Route path={PATH_PUBLIC.completeProfile} element={<CompleteProfile></CompleteProfile>}/>
                <Route path={PATH_PUBLIC.forgotPassword} element={<ForgotPasswordPage></ForgotPasswordPage>}/>
                <Route path={PATH_PUBLIC.verifyEmail} element={<VerifyEmailPage></VerifyEmailPage>}/>
                <Route path={PATH_PUBLIC.signUpStudent} element={<SignUpStudentPage></SignUpStudentPage>}/>
                <Route path={PATH_PUBLIC.signUpInstructor} element={<SignUpInstructor></SignUpInstructor>}/>
                <Route path={PATH_PUBLIC.uploadDegree} element={<UploadDegreeInstructor></UploadDegreeInstructor>}/>
                <Route path={PATH_PUBLIC.courses} element={<CoursesPage></CoursesPage>}/>
                {/* Public routes */}

            </Route>

            <Route element={<AdminLayout/>}>

                <Route element={<AuthGuard roles={[RolesEnum.ADMIN]}/>}>
                    {/* Admin routes */}
                    <Route path={PATH_ADMIN.dashboard} element={<DashboardPage></DashboardPage>}/>
                    <Route path={PATH_ADMIN.categories} element={<CategoriesPage></CategoriesPage>}/>
                    <Route path={PATH_ADMIN.instructors} element={<InstructorsPage></InstructorsPage>}/>
                    <Route path={PATH_ADMIN.emails} element={<EmailsTable></EmailsTable>}/>
                    <Route path={PATH_ADMIN.instructorInfo} element={<InstructorInfoPage></InstructorInfoPage>}/>
                    {/* Admin routes */}
                </Route>

            </Route>

            {/* Catch all (404) */}
            <Route path={PATH_PUBLIC.unauthorized} element={<UnauthorizedPage></UnauthorizedPage>}/>
            <Route path={PATH_PUBLIC.notFound} element={<NotFoundPage/>}/>
            <Route path='*' element={<Navigate to={PATH_PUBLIC.notFound} replace/>}/>
            {/* Catch all (404) */}

        </Routes>
    )
}

export default GlobalRouter;