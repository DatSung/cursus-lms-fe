import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../../../general/Button.tsx";
import {PATH_ADMIN, PATH_INSTRUCTOR} from "../../../../routes/paths.ts";
import {HiMenu} from "react-icons/hi";

const Sidebar = () => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    const handleClick = (url: string): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        navigate(url);
        setIsSidebarOpen(false); // Close sidebar on mobile after navigation
    };

    const toggleMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <div className={`${!isSidebarOpen ? '' : 'w-60'} flex flex-col md:flex-col bg-gray-300`}>

            {/* Mobile menu button */}
            <div className={`p-2 bg-gray-300 ${!isSidebarOpen ? 'min-h-[calc(100vh-48px)]' : ''}`}>
                <Button
                    label={<HiMenu className="text-xl"/>}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    type='button'
                    variant='light'
                />
            </div>

            {/* Sidebar */}
            <div
                className={`${isSidebarOpen ? 'block' : 'hidden'} p-2 min-h-[calc(100vh-48px)] w-full flex flex-col items-stretch gap-4`}
            >
                {/* Dashboard Menu */}
                <div className=''>
                    <Button
                        label='Dashboard'
                        onClick={() => handleClick(PATH_ADMIN.dashboard)}
                        type='button'
                        variant='primary'
                    />
                </div>

                {/* Category Menu */}
                <div className=''>
                    <Button
                        label='Services +'
                        onClick={() => toggleMenu('Services')}
                        type='button'
                        variant='primary'
                    />
                    {openMenu === 'Services' && (
                        <div className='flex flex-col gap-2 mt-2 w-11/12 mx-auto p-2 border-l-2'>
                            <Button
                                label='Courses'
                                type='button'
                                variant='secondary'
                                onClick={() => handleClick(PATH_INSTRUCTOR.courses)}
                            />
                            <Button
                                label='More'
                                type='button'
                                variant='secondary'
                            />
                        </div>
                    )}
                </div>

                {/* User Menus */}
                <div>
                    <Button
                        label='Users +'
                        onClick={() => toggleMenu('Users')}
                        type='button'
                        variant='primary'
                    />
                    {openMenu === 'Users' && (
                        <div className='flex flex-col gap-2 mt-2 w-11/12 mx-auto p-2 border-l-2'>
                            <Button
                                label='Instructors'
                                type='button'
                                variant='secondary'
                                onClick={() => handleClick(PATH_ADMIN.instructors)}
                            />
                            <Button
                                label='Student'
                                type='button'
                                variant='secondary'
                            />
                        </div>
                    )}
                </div>

                {/* More Menus */}
                <div>
                    <Button
                        label='More +'
                        onClick={() => toggleMenu('more')}
                        type='button'
                        variant='primary'
                    />
                    {openMenu === 'more' && (
                        <div className='flex flex-col gap-2 mt-2 w-11/12 mx-auto p-2 border-l-2'>
                            <Button
                                label='Option 1'
                                type='button'
                                variant='secondary'
                            />
                            <Button
                                label='Option 2'
                                type='button'
                                variant='secondary'
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
