import {Navigate, Route, Routes} from "react-router-dom"
import Layout from "../components/layout";
import {PATH_PUBLIC} from "./paths";
import HomePage from "../pages/public/HomePage";
import SignInPage from "../pages/public/SignInPage";
import SignUpStudentPage from "../pages/public/SignUpStudentPage.tsx";
import CoursesPage from "../pages/courses/CoursesPage";
import NotFoundPage from "../pages/public/NotFoundPage";
import ForgotPasswordPage from "../pages/public/ForgotPasswordPage.tsx";
import VerifyEmailPage from "../pages/public/VerifyEmailPage.tsx";
import SignUpInstructor from "../pages/public/SignUpInstructor.tsx";
import UploadDegreeInstructor from "../pages/public/UploadDegreeInstructor.tsx";
import CompleteProfile from "../pages/public/CompleteProfile.tsx";

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
                <Route path={PATH_PUBLIC.unauthorized} element/>
                {/* Public routes */}

                {/* Catch all (404) */}
                <Route path={PATH_PUBLIC.notFound} element={<NotFoundPage/>}/>
                <Route path='*' element={<Navigate to={PATH_PUBLIC.notFound} replace/>}/>
                {/* Catch all (404) */}

            </Route>

        </Routes>
    )
}

export default GlobalRouter;