import CommentList from "./CommentList.tsx";

export interface IProps {
    instructorId: string | null
}

const InstructorComment = (props: IProps) => {
    return (
        <div className={'flex flex-col justify-center items-center'}>
            <h1 className={'text-xl font-bold mb-4'}>Instructor Comment</h1>
            <CommentList instructorId={props.instructorId}></CommentList>
        </div>
    );
};

export default InstructorComment;