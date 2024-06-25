import {useNavigate} from "react-router-dom";
import {PATH_ADMIN, PATH_PUBLIC} from "../../routes/paths.ts";
import useAuth from "../../hooks/useAuth.hook.ts";
import {RolesEnum} from "../../types/auth.types.ts";
import {Button, Result} from "antd";


const NotFoundPage = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    const role = user?.roles[0];
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Button
                    onClick={() => navigate(role === RolesEnum.ADMIN ? PATH_ADMIN.dashboard : PATH_PUBLIC.home)}
                    type="primary"
                >
                    Back Home
                </Button>
            }
        />
    )
}

export default NotFoundPage
