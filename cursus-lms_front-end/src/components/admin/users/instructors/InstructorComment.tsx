import CommentList from "./CommentList.tsx";
import {Divider} from "antd";

export interface IProps {
    instructorId: string | null
}

const InstructorComment = (props: IProps) => {
    return (
        <div className={'flex flex-col justify-center items-center'}>
            <Divider plain><h1 className={'m-8 text-xl font-bold'}>Comments</h1></Divider>
            <CommentList instructorId={props.instructorId}></CommentList>
        </div>
    );
};

export default InstructorComment;