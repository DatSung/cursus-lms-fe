import {Outlet} from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";


const AdminLayout = () => {

    return (
        <div>
            <Header/>

            <div className='flex'>
                <Sidebar></Sidebar>
                <div className='flex w-full m-2'>
                    <Outlet/>
                </div>
            </div>

        </div>
    );
};

export default AdminLayout;