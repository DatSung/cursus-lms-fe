import {IGetAllCoursesDTO} from "../../../../types/course.types.ts";
import {Button, Card} from "antd";

interface IProps {
    course: IGetAllCoursesDTO;
}

const CourseCard = (props :IProps) => {
    return (
        <div>
            <Card
                className={'border-2 shadow-xl text-left'}
                hoverable
                style={{width: 240}}
                cover={<img alt="example"
                            src="data:image/png;base64,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"/>}
            >
                <h1 className={'text-2xl'}>{props.course.title}</h1>
                <p>Category: {props.course.categoryName}</p>
                <p>Level: {props.course.levelName}</p>
                <p>Status: {props.course.currentStatusDescription}</p>
                <i>{props.course.description}</i>
                <Button className={'mt-6 bg-green-600'} type="primary" block>
                    Details
                </Button>
            </Card>
        </div>
    );
};

export default CourseCard;