import {Divider} from "antd";
import {DISPLAY_INSTRUCTOR_DEGREE_URL} from "../../../../utils/apiUrl/authApiUrl.ts";
import {HOST_API_KEY} from "../../../../utils/apiUrl/globalConfig.ts";

interface IProps {
    userId: string | null;
}

const InstructorAvatar = (props: IProps) => {
    const src = `${HOST_API_KEY}${DISPLAY_INSTRUCTOR_DEGREE_URL}${props.userId}`;

    return (
        <div className="flex flex-col items-center justify-center mt-6">
            <Divider plain><h1 className={'m-8 text-xl font-bold'}>Degree</h1></Divider>
            <img
                src={src}
                alt={`Avatar of instructor ${props.userId}`}
                className="w-11/12 rounded-lg object-cover border-2 border-gray-300"
            />
        </div>
    );
};

export default InstructorAvatar;
