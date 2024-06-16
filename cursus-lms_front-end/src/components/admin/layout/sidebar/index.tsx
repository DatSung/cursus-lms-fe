// import {useNavigate} from "react-router-dom";
import Button from "../../../general/Button.tsx";


const Sidebar = () => {

    // const navigate = useNavigate();

    // const handleClick = (url: string) => {
    //     window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    //     navigate(url);
    // };

    return (
        <div className='shrink-0 bg-gray-300 w-60 p-2 min-h-[calc(100vh-48px)] flex flex-col items-stretch gap-8'>

            <Button
                label='Users Management'
                type='button'
                variant='primary'
            />

        </div>
    );
};

export default Sidebar;