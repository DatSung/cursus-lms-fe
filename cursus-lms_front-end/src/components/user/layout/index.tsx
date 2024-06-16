import { Outlet } from "react-router-dom"
import Header from "./Header.tsx"

const Layout = () => {
    return (
        <div>
            <Header></Header>
            <div className="flex">
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Layout;