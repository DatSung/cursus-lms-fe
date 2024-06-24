import {
    DISPLAY_INSTRUCTOR_DEGREE_URL,
    HOST_API_KEY
} from "../../../../utils/apiUrl/globalConfig.ts";

interface IProps {
    userId: string | null;
}

const InstructorAvatar = (props: IProps) => {
    const src = `${HOST_API_KEY}${DISPLAY_INSTRUCTOR_DEGREE_URL}${props.userId}`;

    return (
        <div className="flex flex-col items-center justify-center mt-6">
            <h1 className={'text-xl font-bold mb-4'}>Instructor Degree</h1>
            <img
                src={src}
                alt={`Avatar of instructor ${props.userId}`}
                className="w-11/12 rounded-lg object-cover border-2 border-gray-300"
            />
        </div>
    );
};

export default InstructorAvatar;
