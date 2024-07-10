import {useCallback, useEffect, useState} from 'react';
import {ICourseVersionDTO} from "../../../../types/courseVersion.types.ts";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {COURSE_VERSIONS_URL} from "../../../../utils/apiUrl/courseVersionApiUrl.ts";
import {Button, Card, Divider, Upload, UploadProps} from "antd";
import EditCourseVersion from "./EditCourseVersion.tsx";
import {UploadOutlined} from "@ant-design/icons";
import {HOST_API_KEY} from "../../../../utils/apiUrl/globalConfig.ts";
import {getJwtTokenSession} from "../../../../auth/auth.utils.tsx";
import toast from "react-hot-toast";
import CourseVersionBackground from "./CourseVersionBackground.tsx";

interface IProps {
    courseVersionId: string | null
}

const CourseVersionWall = (props: IProps) => {
    const [courseVersion, setCourseVersion] = useState<ICourseVersionDTO>({
        categoryId: "",
        categoryName: "",
        code: "",
        courseId: "",
        courseImgUrl: "",
        currentStatus: 0,
        currentStatusDescription: "",
        description: "",
        id: "",
        instructorEmail: "",
        instructorId: "",
        learningTime: "",
        levelId: "",
        levelName: "",
        oldPrice: 0,
        price: 0,
        title: "",
        version: ""
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [reload, setReload] = useState<boolean>(false);
    const [imgKey, setImgKey] = useState<number>(0);

    const uploadProps: UploadProps = {
        name: 'file',
        action: `${HOST_API_KEY}${COURSE_VERSIONS_URL.UPLOAD_COURSE_VERSION_BACKGROUND(props.courseVersionId)}`,
        headers: {
            authorization: 'Bearer ' + getJwtTokenSession().accessToken,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                toast.success(`${info.file.name} file uploaded successfully`);
                setImgKey(preImgKey => preImgKey + 1);
            } else if (info.file.status === 'error') {
                toast.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    useEffect(() => {
        const getCourseVersion = async () => {
            try {
                const response = await axiosInstance.get<IResponseDTO<ICourseVersionDTO>>(COURSE_VERSIONS_URL.GET_COURSE_VERSION(props.courseVersionId));
                setCourseVersion(response.data.result);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        }
        getCourseVersion();
    }, [props.courseVersionId, reload]);

    const handleReload = useCallback(() => {
        setReload(preReload => !preReload);
    }, [])

    return (
        <Card loading={loading} className="border-2 shadow-xl text-left min-w-80">
            <div className="text-right">
                <EditCourseVersion courseVersion={courseVersion} handleReload={handleReload}></EditCourseVersion>
            </div>
            <div className="flex flex-col justify-evenly md:flex-row w-full items-center">
                <div className="w-4/12 flex items-center gap-4 flex-col">
                    <CourseVersionBackground
                        key={imgKey}
                        courseVersionId={courseVersion.id}
                    >

                    </CourseVersionBackground>
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined/>}>Upload</Button>
                    </Upload>
                </div>
                <div className="w-6/12">
                    <h2 className="text-4xl font-bold mb-6">{courseVersion?.title}</h2>
                    <Divider orientation={"center"} plain>Details</Divider>
                    <div className="flex flex-col justify-between text-left md:flex-row gap-6">
                        <div>
                            <p className="text-base text-gray-800">
                                <strong>Code: </strong>{courseVersion?.code}
                            </p>
                            <p className="text-base text-gray-800">
                                <strong>Category: </strong>{courseVersion?.categoryName}
                            </p>
                            <p className="text-base text-gray-800"><strong>Level: </strong>{courseVersion?.levelName}
                            </p>
                        </div>

                        <div>
                            <p className="text-base text-gray-800">
                                <strong>Learning Time: </strong>{courseVersion?.learningTime} hours
                            </p>
                            <p className="text-base text-gray-800">
                                <strong>Price: </strong>{courseVersion?.price} USD
                            </p>
                        </div>

                        <div>
                            <p className="text-base text-gray-800">
                                <strong>Version: </strong>{courseVersion?.version}
                            </p>
                            <p className="text-base text-gray-800">
                                <strong>Status: </strong>{courseVersion?.currentStatusDescription}
                            </p>
                        </div>

                    </div>

                    <Divider className={'caret-amber-600'} orientation="center" plain>Description</Divider>

                    <div className="my-4">
                        <p className="text-base text-gray-800">{courseVersion?.description}</p>
                    </div>

                </div>
            </div>
        </Card>

    );
};

export default CourseVersionWall;