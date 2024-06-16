import {Outlet, useLocation} from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";


const AdminLayout = () => {

    const {pathname} = useLocation();

    console.log(pathname);

    return (
        <div>
            <Header/>

            <div className='flex'>
                <Sidebar></Sidebar>
                <Outlet/>
            </div>

        </div>
    );
};

export default AdminLayout;