import {useNavigate} from "react-router-dom";
import {Button, Card} from "antd";
import {PATH_INSTRUCTOR} from "../../../../routes/paths.ts";
import {ICourseVersionDTO} from "../../../../types/courseVersion.types.ts";

interface IProps {
    courseVersion: ICourseVersionDTO;
}

const CourseVersionCard = (props: IProps) => {
    const navigate = useNavigate();

    // Check if the course version can be edited
    const canEdit = (status: string): boolean => {
        switch (Number(status)) {
            case 1: {
                return false;
            }
            case 4: {
                return false;
            }
            case 5: {
                return false;
            }
            default: {
                return true
            }
        }
    }

    // Check if the course version can be deleted
    const canDelete = (status: string): boolean => {
        switch (Number(status)) {
            case 1: {
                return false;
            }
            case 4: {
                return false;
            }
            case 5: {
                return false;
            }
            default: {
                return true
            }
        }
    }
    // Check if the course version can be submitted
    const canSubmit = (status: string): boolean => {
        switch (Number(status)) {
            case 1: {
                return false;
            }
            case 2: {
                return false;
            }
            case 4: {
                return false;
            }
            case 5: {
                return false;
            }
            default: {
                return true
            }
        }
    }

    // Check if the course version can be merged
    const canMerge = (status: string): boolean => {
        switch (Number(status)) {
            case 0: {
                return false;
            }
            case 1: {
                return false;
            }
            case 3: {
                return false;
            }
            case 4: {
                return false;
            }
            case 5: {
                return false;
            }
            default: {
                return true
            }
        }
    }

    return (
        <Card
            className={'border-2 flex flex-col md:flex-row items-center w-full shadow-xl min-w-80 mb-6'}
            hoverable
            style={{width: '100%'}}
            cover={
                <img style={{width: 250}} alt="example"
                     src="https://codeopinion.com/wp-content/uploads/2018/07/Bitmap-MEDIUM_ASP.NET-Core-Logo_2colors_Square_RGB.png"/>
            }
        >
            <div className="text-left w-96">
                <h1 className={'text-2xl mb-4'}>{props.courseVersion.title} <span
                    className={'italic'}>[version {props.courseVersion.version}]</span></h1>
                <p>Category: {props.courseVersion.categoryName}</p>
                <p>Level: {props.courseVersion.levelName}</p>
                <p className={'italic my-2'}>{props.courseVersion.description}</p>
                <h2 className={'text-xl underline text-green-400 font-bold'}>{props.courseVersion.currentStatusDescription.toUpperCase()}</h2>
            </div>
            <div className={'flex flex-col md:flex-row gap-2'}>
                <Button
                    onClick={() => navigate(PATH_INSTRUCTOR.courseVersions + "?courseId=" + props.courseVersion.courseId)}
                    className={'mt-6 bg-gray-100'}
                    type="dashed"
                    block
                >
                    Clone
                </Button>

                <Button
                    disabled={!canEdit(props.courseVersion.currentStatus)}
                    onClick={() => navigate(PATH_INSTRUCTOR.courseVersionDetails + "?courseVersionId=" + props.courseVersion.id)}
                    className={'mt-6 bg-gray-200'}
                    type="dashed"
                    block
                >
                    Edit
                </Button>

                <Button
                    disabled={!canDelete(props.courseVersion.currentStatus)}
                    onClick={() => navigate(PATH_INSTRUCTOR.courseVersions + "?courseId=" + props.courseVersion.courseId)}
                    className={'mt-6 bg-red-500'}
                    type="primary"
                    block
                >
                    Delete
                </Button>

                <Button
                    disabled={!canSubmit(props.courseVersion.courseId)}
                    onClick={() => navigate(PATH_INSTRUCTOR.courseVersions + "?courseId=" + props.courseVersion.courseId)}
                    className={'mt-6 bg-green-600'}
                    type="primary"
                    block
                >
                    Submit
                </Button>

                <Button
                    disabled={!canMerge(props.courseVersion.currentStatus)}
                    onClick={() => navigate(PATH_INSTRUCTOR.courseVersions + "?courseId=" + props.courseVersion.courseId)}
                    className={'mt-6'}
                    type="primary"
                    block
                >
                    Merge
                </Button>
            </div>
        </Card>
    );
};

export default CourseVersionCard;