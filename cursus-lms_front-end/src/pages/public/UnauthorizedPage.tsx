import {RolesEnum} from "../../types/auth.types.ts";
import {PATH_ADMIN, PATH_PUBLIC} from "../../routes/paths.ts";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth.hook.ts";
import {Button, Result} from "antd";

const UnauthorizedPage = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    const role = user?.roles[0];
    return (
        <div className='flex flex-col items-center justify-center'>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <Button
                        onClick={() => navigate(role === RolesEnum.ADMIN ? PATH_ADMIN.dashboard : PATH_PUBLIC.home)}
                        type="primary"
                    >
                        Back Home
                    </Button>
                }
            />
        </div>
    );
};

export default UnauthorizedPage;