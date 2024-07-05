import {useEffect, useState} from "react";
import {IInstructorInfoDTO} from "../../../../types/instructor.types.ts";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {INSTRUCTORS_URL} from "../../../../utils/apiUrl/instructorApiUrl.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import Spinner from "../../../general/Spinner.tsx";
import {formatTimestamp} from "../../../../utils/funcs/formatDate.ts";
import InstructorAvatar from "./InstructorAvatar.tsx";
import InstructorDegree from "./InstructorDegree.tsx";
import {Button} from "@material-tailwind/react";
import EditInstructor from "./EditInstructor.tsx";
import toast from "react-hot-toast";
import TotalCourses from "./TotalCourses.tsx";
import TotalRating from "./TotalRating.tsx";
import TotalEarned from "./TotalEarned.tsx";
import TotalPayout from "./TotalPayout.tsx";
import {Divider} from "antd";

interface IProps {
    instructorId: string | null;
}

const InstructorDetails = (props: IProps) => {
    const [instructorDetails, setInstructorDetails] = useState<IInstructorInfoDTO>();
    const [loading, setLoading] = useState<boolean>(true);
    const [reload, setReload] = useState(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [acceptLoading, setAcceptLoading] = useState<boolean>(false);
    const [lockLoading, setLockLoading] = useState<boolean>(false);

    useEffect(() => {
        const getInstructorInfo = async () => {
            const response = await axiosInstance.get<IResponseDTO<IInstructorInfoDTO>>(
                INSTRUCTORS_URL.GET_PUT_INSTRUCTOR_URL(props.instructorId)
            );
            setInstructorDetails(response.data.result);
            setLoading(false);
        };
        getInstructorInfo();
    }, [props.instructorId, reload]);

    const handleAcceptOrReject = async (instructorId: string, isAccepted: boolean) => {
        setAcceptLoading(true);
        if (isAccepted) {
            await axiosInstance.post(INSTRUCTORS_URL.REJECT_INSTRUCTOR_URL(instructorId));
            toast.success("Rejected instructor");
        } else {
            await axiosInstance.post(INSTRUCTORS_URL.ACCEPT_INSTRUCTOR_URL(instructorId));
            toast.success("Accepted instructor");
        }
        setAcceptLoading(false);
        setReload(!reload);
    }

    const handleLock = async (instructorId: string) => {
        setLockLoading(true);
        toast.error(`Wanna lock ${instructorId}, please wait until I want to do this :>`)
        setLockLoading(false);
    }

    const handleEdit = () => {
        setEdit(!edit)
        setReload(!reload);
    }

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <Spinner/>
            ) : !instructorDetails ? (
                <div className="text-center text-gray-500">No instructor details available.</div>
            ) : (
                <div className="">

                    <div
                        className={'flex flex-col md:flex-row items-center justify-evenly space-y-4 md:space-y-0 md:space-x-4'}>

                        <div>
                            <InstructorAvatar
                                avatarUrl={instructorDetails.avatarUrl}
                                userId={instructorDetails.userId}
                            />
                            <h1 className={'text-xl font-bold mt-4'}>Avatar</h1>
                        </div>

                        {
                            edit ?
                                (
                                    <div className='border-2 p-4 rounded-md shadow-md bg-white w-full md:w-1/2'>
                                        <h1 className={'text-xl font-bold mb-4'}>Editing</h1>
                                        <div className={'flex gap-4 mt-6 justify-center'}>
                                            <EditInstructor
                                                instructorInfo={instructorDetails}
                                                cancelEdit={handleEdit}
                                            >

                                            </EditInstructor>
                                        </div>
                                    </div>
                                )
                                :
                                (
                                    <div className="border-2 p-4 rounded-md shadow-md bg-white w-full md:w-1/2">
                                        <h1 className={'text-xl font-bold mb-4'}>Information</h1>
                                        <div className="space-y-2 text-left">
                                            <p>
                                                <strong>Introduction:</strong> {instructorDetails.introduction}
                                            </p>
                                            <p>
                                                <strong>Full Name:</strong> {instructorDetails.fullName}
                                            </p>
                                            <p>
                                                <strong>Email:</strong> {instructorDetails.email}
                                            </p>
                                            <p>
                                                <strong>Phone Number:</strong> {instructorDetails.phoneNumber}
                                            </p>
                                            <p>
                                                <strong>Gender:</strong> {instructorDetails.gender}
                                            </p>
                                            <p>
                                                <strong>Birth
                                                    Date:</strong> {formatTimestamp(instructorDetails.birthDate)}
                                            </p>
                                            <p>
                                                <strong>Country:</strong> {instructorDetails.country}
                                            </p>
                                            <p>
                                                <strong>Address:</strong> {instructorDetails.address}
                                            </p>
                                            <p>
                                                <strong>Degree:</strong> {instructorDetails.degree}
                                            </p>
                                            <p>
                                                <strong>Industry:</strong> {instructorDetails.industry}
                                            </p>
                                            <p>
                                                <strong>Tax Number:</strong> {instructorDetails.taxNumber}
                                            </p>
                                            <p>
                                                <strong>Accepted:</strong> {instructorDetails.isAccepted ? "Yes" : "No"}
                                            </p>
                                        </div>

                                        <div className={'flex gap-4 mt-6 justify-center'}>
                                            <Button
                                                onClick={handleEdit}
                                                placeholder={undefined}
                                                onPointerEnterCapture={undefined}
                                                onPointerLeaveCapture={undefined}
                                                className={'py-1 bg-white text-black border border-green-700 rounded-md normal-case'}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                loading={acceptLoading}
                                                onClick={() => handleAcceptOrReject(instructorDetails.instructorId, instructorDetails?.isAccepted)}
                                                placeholder={undefined}
                                                onPointerEnterCapture={undefined}
                                                onPointerLeaveCapture={undefined}
                                                className={`py-1 ${instructorDetails.isAccepted ? 'bg-yellow-600' : 'bg-green-800'} rounded-md normal-case`}
                                            >
                                                {instructorDetails.isAccepted ? 'Reject' : 'Accept'}
                                            </Button>
                                            <Button
                                                onClick={() => handleLock(instructorDetails.instructorId)}
                                                loading={lockLoading}
                                                placeholder={undefined}
                                                onPointerEnterCapture={undefined}
                                                onPointerLeaveCapture={undefined}
                                                className={'py-1 bg-red-700 rounded-md normal-case'}
                                            >
                                                Lock
                                            </Button>
                                        </div>

                                    </div>
                                )
                        }
                    </div>

                    <div>
                        <Divider plain><h1 className={'m-8 text-xl font-bold'}>Statistic</h1></Divider>
                        <div className='flex flex-wrap justify-center items-center gap-8'>
                            <div>
                                <TotalCourses instructorId={instructorDetails.instructorId}></TotalCourses>
                            </div>
                            <div>
                                <TotalEarned></TotalEarned>
                            </div>
                            <div>
                                <TotalPayout></TotalPayout>
                            </div>
                            <div>
                                <TotalRating instructorId={instructorDetails.instructorId}></TotalRating>
                            </div>
                        </div>
                    </div>

                    <div>
                        <InstructorDegree
                            userId={instructorDetails.userId}
                        >
                        </InstructorDegree>
                    </div>

                </div>
            )}
        </div>
    );
};

export default InstructorDetails;
