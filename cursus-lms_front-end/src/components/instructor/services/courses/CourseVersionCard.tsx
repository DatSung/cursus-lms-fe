import {useNavigate} from "react-router-dom";
import {Button, Card, Popconfirm} from "antd";
import {PATH_INSTRUCTOR} from "../../../../routes/paths.ts";
import {ICloneCourseVersionDTO, ICourseVersionDTO} from "../../../../types/courseVersion.types.ts";
import {CopyOutlined, DeleteOutlined, EditOutlined, MergeOutlined, SendOutlined} from "@ant-design/icons";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {COURSE_VERSIONS_URL} from "../../../../utils/apiUrl/courseVersionApiUrl.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import toast from "react-hot-toast";
import {HOST_API_KEY} from "../../../../utils/apiUrl/globalConfig.ts";

interface IProps {
    courseVersion: ICourseVersionDTO;
    handleReloadTable: () => void
}

const CourseVersionCard = (props: IProps) => {
        const navigate = useNavigate();

        // Check if the course version can be edited
        const canEdit = (status: number): boolean => {
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
        const canDelete = (status: number): boolean => {
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
        const canSubmit = (status: number): boolean => {
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
        const canMerge = (status: number): boolean => {
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

        const confirmClone = () => {
            return new Promise((resolve, reject) => {
                const data: ICloneCourseVersionDTO = {
                    courseVersionId: props.courseVersion.id
                };
                axiosInstance.post<IResponseDTO<string>>(COURSE_VERSIONS_URL.CLONE_COURSE_VERSION(), data)
                    .then((response) => {
                        const result = response.data;
                        if (result.isSuccess) {
                            toast.success(result.message);
                            props.handleReloadTable()
                            resolve(result);
                        } else {
                            toast.error(result.message);
                            reject(new Error(result.message));
                        }
                    })
                    .catch((error) => {
                        console.error('Error cloning course version:', error);
                        resolve(error);
                    });

            });
        };

        const confirmDelete = () => {
            return new Promise((resolve, reject) => {
                axiosInstance.delete<IResponseDTO<string>>(COURSE_VERSIONS_URL.REMOVE_COURSE_VERSION(props.courseVersion.id))
                    .then((response) => {
                        const result = response.data;
                        if (result.isSuccess) {
                            toast.success(result.message);
                            props.handleReloadTable()
                            resolve(result);
                        } else {
                            toast.error(result.message);
                            reject(new Error(result.message));
                        }
                    })
                    .catch((error) => {
                        console.error('Error cloning course version:', error);
                        resolve(error);
                    });

            });
        };

        const confirmSubmit = () => {
            return new Promise((resolve, reject) => {
                axiosInstance.post<IResponseDTO<string>>(COURSE_VERSIONS_URL.SUBMIT_COURSE_VERSION(props.courseVersion.id))
                    .then((response) => {
                        const result = response.data;
                        if (result.isSuccess) {
                            toast.success(result.message);
                            props.handleReloadTable()
                            resolve(result);
                        } else {
                            toast.error(result.message);
                            reject(new Error(result.message));
                        }
                    })
                    .catch((error) => {
                        console.error('Error cloning course version:', error);
                        resolve(error);
                    });

            });
        };

        const confirmMerge = () => {
            return new Promise((resolve, reject) => {
                axiosInstance.post<IResponseDTO<string>>(COURSE_VERSIONS_URL.MERGE_COURSE_VERSION(props.courseVersion.id))
                    .then((response) => {
                        const result = response.data;
                        if (result.isSuccess) {
                            toast.success(result.message);
                            props.handleReloadTable()
                            resolve(result);
                        } else {
                            toast.error(result.message);
                            reject(new Error(result.message));
                        }
                    })
                    .catch((error) => {
                        console.error('Error cloning course version:', error);
                        resolve(error);
                    });

            });
        };
        return (
            <Card
                className={'border-2 flex flex-col md:flex-row items-center w-full shadow-xl min-w-80 mb-6'}
                hoverable
                style={{width: '100%'}}
            >
                <div className={'flex gap-6 items-center'}>
                    <div className={'w-4/12'}>
                        <img style={{width: "100%"}} alt="course version background"
                             src={`${HOST_API_KEY}${COURSE_VERSIONS_URL.DISPLAY_COURSE_VERSION_BACKGROUND(props.courseVersion.id)}`}/>
                    </div>
                    <div className={'w-8/12'}>
                        <div className="text-left">
                            <h1 className={'text-2xl mb-4'}>{props.courseVersion.title}
                                <span
                                    className={'italic text-green-800 text-nowrap'}> [version {props.courseVersion.version}]</span>
                            </h1>
                            <p>Category: {props.courseVersion.categoryName}</p>
                            <p>Level: {props.courseVersion.levelName}</p>
                            <p className={'italic my-2'}>{props.courseVersion.description}</p>
                            <h2 className={'text-green-800 font-bold'}>{props.courseVersion.currentStatusDescription.toUpperCase()}</h2>
                        </div>
                        <div className={'flex flex-col md:flex-row gap-2'}>

                            <Button
                                onClick={() => navigate(PATH_INSTRUCTOR.courseVersionDetails + '?courseVersionId=' + props.courseVersion.id)}
                                disabled={!canEdit(props.courseVersion.currentStatus)}
                                className={'mt-6 bg-gray-100'}
                                type="dashed"
                                block
                            >
                                <EditOutlined/> Edit
                            </Button>

                            <Popconfirm
                                className={'mt-6 bg-gray-100'}
                                title="Confirmation"
                                description="Are you sure to clone this version?"
                                onConfirm={confirmClone}
                                onOpenChange={() => console.log('open change')}
                            >
                                <Button
                                    className={'mt-6 bg-gray-200'}
                                    type="dashed"
                                    block
                                >
                                    <CopyOutlined/> Clone
                                </Button>
                            </Popconfirm>


                            <Popconfirm
                                className={'mt-6 bg-gray-100'}
                                title="Confirmation"
                                description="Are you sure to delete this version?"
                                onConfirm={confirmDelete}
                                onOpenChange={() => console.log('open change')}
                            >
                                <Button
                                    disabled={!canDelete(props.courseVersion.currentStatus)}
                                    className={'mt-6 bg-red-500'}
                                    type="primary"
                                    block
                                >
                                    <DeleteOutlined/> Delete
                                </Button>
                            </Popconfirm>


                            <Popconfirm
                                className={'mt-6 bg-gray-100'}
                                title="Confirmation"
                                description="Are you sure to submit this version?"
                                onConfirm={confirmSubmit}
                                onOpenChange={() => console.log('open change')}
                            >
                                <Button
                                    disabled={!canSubmit(props.courseVersion.currentStatus)}
                                    className={'mt-6 bg-green-600'}
                                    type="primary"
                                    block
                                >
                                    <SendOutlined/> Submit
                                </Button>
                            </Popconfirm>

                            <Popconfirm
                                className={'mt-6 bg-green-600'}
                                title="Confirmation"
                                description="Are you sure to merge this version?"
                                onConfirm={confirmMerge}
                                onOpenChange={() => console.log('open change')}
                            >
                                <Button
                                    disabled={!canMerge(props.courseVersion.currentStatus)}
                                    onClick={() => navigate(PATH_INSTRUCTOR.courseVersions + "?courseId=" + props.courseVersion.courseId)}
                                    className={'mt-6'}
                                    type="primary"
                                    block
                                >
                                    <MergeOutlined/> Merge
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
;

export default CourseVersionCard;