import {
    Disclosure,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react'
import {BellIcon} from '@heroicons/react/24/outline'
import {useNavigate} from 'react-router-dom'
import CursusLogo from '../../../../../public/images/logo/CURSUSLOGO.svg'
import useAuth from "../../../../hooks/useAuth.hook.ts";
import {PATH_ADMIN} from "../../../../routes/paths.ts";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {

    const {isAuthenticated, user, signOut} = useAuth();
    const navigate = useNavigate();

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {() => (
                <>
                    <div className="mx-auto max-w-7xl px-8 sm:px-8 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-8 w-auto"
                                        src={CursusLogo}
                                        alt="Cursus LMS Website"
                                    />
                                </div>
                            </div>
                            {
                                isAuthenticated
                                    ?
                                    (
                                        <div
                                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                            <button
                                                type="button"
                                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="absolute -inset-1.5"/>
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                            </button>

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <MenuButton
                                                        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5"/>
                                                        <span className="sr-only">Open user menu</span>
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src=""
                                                            alt=""
                                                        />
                                                    </MenuButton>
                                                </div>
                                                <Transition
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <MenuItems
                                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                                                        <MenuItem>
                                                            {({focus}) => (
                                                                <a
                                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                                                >
                                                                    {user?.fullName}
                                                                </a>
                                                            )}
                                                        </MenuItem>

                                                        <MenuItem>
                                                            {({focus}) => (
                                                                <a
                                                                    onClick={() => navigate(PATH_ADMIN.dashboard)}
                                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                                                >
                                                                    Workspace
                                                                </a>
                                                            )}
                                                        </MenuItem>

                                                        <MenuItem>
                                                            {({focus}) => (
                                                                <a
                                                                    onClick={() => navigate('ddd')}
                                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                                                >
                                                                    Profile
                                                                </a>
                                                            )}
                                                        </MenuItem>

                                                        <MenuItem>
                                                            {({focus}) => (
                                                                <a
                                                                    onClick={() => navigate('')}
                                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                                                >
                                                                    Settings
                                                                </a>
                                                            )}
                                                        </MenuItem>

                                                        <MenuItem>
                                                            {({focus}) => (
                                                                <a
                                                                    onClick={signOut}
                                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                                                >
                                                                    Sign out
                                                                </a>
                                                            )}
                                                        </MenuItem>

                                                    </MenuItems>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    )
                                    :
                                    (
                                        <div
                                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    )
}

export default Header;