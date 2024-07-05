import {DISPLAY_USER_AVATAR_URL} from "../../../../utils/apiUrl/authApiUrl.ts";
import {HOST_API_KEY} from "../../../../utils/apiUrl/globalConfig.ts";


interface IProps {
    userId: string | null;
    avatarUrl: string | null;
}

const InstructorAvatar = (props: IProps) => {
    let src = `${HOST_API_KEY}${DISPLAY_USER_AVATAR_URL}${props.userId}`;
    if (props.avatarUrl?.startsWith("http")) {
        src = props.avatarUrl;
    }

    return (
        <div className="flex items-center justify-center">
            <img
                src={src}
                alt={`Avatar of instructor ${props.userId}`}
                className="w-96 h-96 rounded-lg object-cover border-2 border-gray-300"
            />
        </div>
    );
};

export default InstructorAvatar;
