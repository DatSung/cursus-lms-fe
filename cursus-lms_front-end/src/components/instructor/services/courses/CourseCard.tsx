import {ICourseDTO} from "../../../../types/course.types.ts";
import {Button, Card} from "antd";
import {PATH_INSTRUCTOR} from "../../../../routes/paths.ts";
import {useNavigate} from "react-router-dom";
import {COURSE_VERSIONS_URL} from "../../../../utils/apiUrl/courseVersionApiUrl.ts";
import {HOST_API_KEY} from "../../../../utils/apiUrl/globalConfig.ts";

interface IProps {
    course: ICourseDTO;
}

const CourseCard = (props: IProps) => {
    const navigate = useNavigate();

    return (
        <Card
            className={'border-2 shadow-xl text-left min-w-80 mb-6'}
            hoverable
            style={{width: 240}}
            cover={<img alt="example"
                        src={`${HOST_API_KEY}${COURSE_VERSIONS_URL.DISPLAY_COURSE_VERSION_BACKGROUND(props.course.id)}`}/>}
        >
            <h1 className={'text-2xl mb-4'}>{props.course.title}</h1>
            <p>Category: {props.course.categoryName}</p>
            <p>Level: {props.course.levelName}</p>
            <p className={'mb-2'}>Status: {props.course.currentStatusDescription}</p>
            <div className={'flex gap-2'}>
                <Button
                    onClick={() => navigate(PATH_INSTRUCTOR.courseVersions + "?courseId=" + props.course.courseId)}
                    className={'mt-6 bg-gray-200'}
                    type="dashed"
                    block
                >
                    Details
                </Button>
                <Button
                    onClick={() => navigate(PATH_INSTRUCTOR.courseVersions + "?courseId=" + props.course.courseId)}
                    className={'mt-6 bg-green-600'}
                    type="primary"
                    block
                >
                    Console
                </Button>
            </div>
        </Card>
    );
};

export default CourseCard;