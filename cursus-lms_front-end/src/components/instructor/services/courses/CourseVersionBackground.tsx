import {HOST_API_KEY} from "../../../../utils/apiUrl/globalConfig.ts";
import {COURSE_VERSIONS_URL} from "../../../../utils/apiUrl/courseVersionApiUrl.ts";

interface IProps {
    courseVersionId: string;
}

const CourseVersionBackground = (props: IProps) => {
    return (
        <>
            <img
                className="w-full h-auto"
                src={`${HOST_API_KEY}${COURSE_VERSIONS_URL.DISPLAY_COURSE_VERSION_BACKGROUND(props.courseVersionId)}`}
                alt="Course Image"
            />
        </>
    );
};

export default CourseVersionBackground;