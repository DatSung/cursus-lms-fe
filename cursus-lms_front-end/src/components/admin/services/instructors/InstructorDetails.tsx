import {useEffect, useState} from "react";
import {IInstructorInfoDTO} from "../../../../types/instructor.types.ts";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {INSTRUCTORS_URL} from "../../../../utils/apiUrl/globalConfig.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import Spinner from "../../../general/Spinner.tsx";
import {formatTimestamp} from "../../../../utils/funcs/formatDate.ts";
import InstructorAvatar from "./InstructorAvatar.tsx";
import InstructorDegree from "./InstructorDegree.tsx";

interface IProps {
    instructorId: string | null;
}

const InstructorDetails = (props: IProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [instructorDetails, setInstructorDetails] = useState<IInstructorInfoDTO>();

    useEffect(() => {
        const getInstructorInfo = async () => {
            const response = await axiosInstance.get<IResponseDTO<IInstructorInfoDTO>>(
                INSTRUCTORS_URL.GET_PUT_INSTRUCTOR_URL(props.instructorId)
            );
            setInstructorDetails(response.data.result);
            setLoading(false);
        };
        getInstructorInfo();
    }, [props.instructorId]);

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <Spinner/>
            ) : !instructorDetails ? (
                <div className="text-center text-gray-500">No instructor details available.</div>
            ) : (
                <div
                    className="">
                    <h1 className={'text-xl font-bold mb-4'}>Instructor Information</h1>
                    <div
                        className={'flex flex-col md:flex-row items-center justify-evenly space-y-4 md:space-y-0 md:space-x-4'}>

                        <div>
                            <InstructorAvatar
                                avatarUrl={instructorDetails.avatarUrl}
                                userId={instructorDetails.userId}
                            />
                        </div>

                        <div className="border-2 p-4 rounded-md shadow-md bg-white w-full md:w-1/2">
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
                                    <strong>Birth Date:</strong> {formatTimestamp(instructorDetails.birthDate)}
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
