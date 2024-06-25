import {RolesEnum} from "../../types/auth.types.ts";
import {PATH_ADMIN, PATH_PUBLIC} from "../../routes/paths.ts";
import Button from "../../components/general/Button.tsx";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth.hook.ts";

const UnauthorizedPage = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    const role = user?.roles[0];
    return (
        <div className='flex flex-col items-center justify-center'>
            Unauthorized Page
            <Button
                variant='secondary'
                type='button'
                label='Back'
                onClick={() => navigate(role === RolesEnum.ADMIN ? PATH_ADMIN.dashboard : PATH_PUBLIC.home)}
            />
        </div>
    );
};

export default UnauthorizedPage;