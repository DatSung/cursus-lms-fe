import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "../components/layout";
import { PATH_PUBLIC } from "./paths";
import HomePage from "../pages/public/HomePage";
import SignInPage from "../pages/public/SignInPage";
import SignUpPage from "../pages/public/SignUpPage";
import CoursesPage from "../pages/courses/CoursesPage";
import NotFoundPage from "../pages/public/NotFoundPage";

const GlobalRouter = () => {
    return (
        <Routes>

            <Route element={<Layout />}>

                {/* Public routes */}
                <Route index element={<HomePage></HomePage>} />
                <Route path={PATH_PUBLIC.signin} element={<SignInPage></SignInPage>} />
                <Route path={PATH_PUBLIC.signup} element={<SignUpPage></SignUpPage>} />
                <Route path={PATH_PUBLIC.courses} element={<CoursesPage></CoursesPage>} />
                <Route path={PATH_PUBLIC.unauthorized} element />
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