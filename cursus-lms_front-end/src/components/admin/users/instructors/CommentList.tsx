import React, {useEffect, useState} from "react";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {
    ICreateComment,
    IInstructorComment,
    IPagingParameters,
    IUpdateComment
} from "../../../../types/instructor.types.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import Spinner from "../../../general/Spinner.tsx";
import {Button} from "@material-tailwind/react";
import moment from "moment";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth.hook.ts";
import toast from "react-hot-toast";
import {INSTRUCTORS_URL} from "../../../../utils/apiUrl/instructorApiUrl.ts";

export interface IProps {
    instructorId: string | null
}

const CommentList = (props: IProps) => {

    const [loading, setloading] = useState<boolean>(true);
    const [comments, setComments] = useState<IInstructorComment[]>();
    const [reload, setReload] = useState(false);
    const [query, setQuery] = useState<IPagingParameters>(
        {
            pageSize: 5,
            pageNumber: 1,
        }
    )
    const {user} = useAuth();

    useEffect(() => {
        const getCommentList = async () => {
            const response = await axiosInstance.get<IResponseDTO<IInstructorComment[]>>(INSTRUCTORS_URL.GET_ALL_COMMENT_INSTRUCTOR_URL(props.instructorId, query));
            setComments(response.data.result);
            setloading(false);
        }

        getCommentList();
    }, [query, reload]);

    const renderComments = (comments: IInstructorComment[]) => {

        if (comments.length === 0) {
            return (
                <div className="flex items-start gap-4 p-2 justify-center">
                    There are no comment
                </div>
            )
        }

        return comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-4 p-2">
                <img className="w-12 h-12 rounded-full mt-2" src="https://via.placeholder.com/150" alt="User Avatar"/>
                <div className=''>
                    <div className="bg-gray-100 p-3 rounded-lg">
                        <h4 className="text-left font-semibold">{comment.createBy}</h4>
                        <p className="text-left text-wrap text-gray-700">{comment.comment}</p>
                    </div>
                    <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                        <button className="hover:underline">{comment.statusDescription}</button>
                        {
                            comment.createBy === user?.email ?
                                (
                                    <>
                                        <button
                                            onClick={() => handleEditComment(comment.id, comment.comment)}
                                            className="hover:underline"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDeleteComment(comment.id)}
                                            className="hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )
                                :
                                (
                                    <>
                                    </>
                                )
                        }
                        <span>·</span>
                        <span>{moment(comment.createTime).fromNow()}</span>
                    </div>
                </div>
            </div>
        ));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setQuery(prevQuery => ({
            ...prevQuery,
            [name]: value
        }));
    }

    const handleCreateComment = async () => {
        const {value: formValues} = await Swal.fire({
            title: 'Create new comment',
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="Comment" type="text">`,
            focusConfirm: false,
            preConfirm: () => {
                const comment = (document.getElementById('swal-input1') as HTMLInputElement).value;
                return {comment};
            }
        });

        if (formValues && formValues.comment) {
            const newComment: ICreateComment = {
                comment: formValues.comment,
                instructorId: props.instructorId
            }
            await axiosInstance.post(INSTRUCTORS_URL.POST_PUT_DELETE_COMMENT_INSTRUCTOR_URL(null), newComment);
            setReload(!reload);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        const response = await axiosInstance.delete<IResponseDTO<string>>(INSTRUCTORS_URL.POST_PUT_DELETE_COMMENT_INSTRUCTOR_URL(commentId));
        if (response.data.statusCode === 200) {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
        setReload(!reload);
    }

    const handleEditComment = async (commentId: string, comment: string) => {
        const {value: formValues} = await Swal.fire({
            title: 'Edit comment',
            html:
                `<input id="swal-input1" class="swal2-input" value="${comment}" placeholder="Comment" type="text">`,
            focusConfirm: false,
            preConfirm: () => {
                const comment = (document.getElementById('swal-input1') as HTMLInputElement).value;
                return {comment};
            }
        });

        if (formValues && formValues.comment) {
            const updateComment: IUpdateComment = {
                id: commentId,
                comment: formValues.comment,
            }
            await axiosInstance.put(INSTRUCTORS_URL.POST_PUT_DELETE_COMMENT_INSTRUCTOR_URL(null), updateComment);
            setReload(!reload);
        }
    }

    return (
        <div>
            {
                loading ? (<Spinner></Spinner>) :
                    (
                        !comments ? (<div>There are no comment</div>) :
                            (
                                <div>
                                    <div className='flex justify-center items-end gap-4'>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                                   htmlFor="pageSize">
                                                Page Size
                                            </label>
                                            <input
                                                type="number"
                                                id="pageSize"
                                                name="pageSize"
                                                value={query.pageSize.toString()}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="Enter page size"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                                   htmlFor="pageNumber">
                                                Page Number
                                            </label>
                                            <input
                                                type="number"
                                                id="pageNumber"
                                                name="pageNumber"
                                                value={query.pageNumber.toString()}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="Enter page number"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Button
                                                placeholder={undefined}
                                                onPointerEnterCapture={undefined}
                                                onPointerLeaveCapture={undefined}
                                                className={'bg-green-800 py-2 normal-case'}
                                                onClick={() => handleCreateComment()}
                                            >
                                                Create</Button>
                                        </div>
                                    </div>
                                    <div className={'bg-white p-4 rounded-lg shadow-md gap-4'}>
                                        {renderComments(comments)}
                                    </div>
                                </div>
                            )
                    )
            }
        </div>
    );
};

export default CommentList;