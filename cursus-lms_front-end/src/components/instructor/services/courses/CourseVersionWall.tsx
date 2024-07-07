import {useEffect, useState} from 'react';
import {ICourseVersionDTO} from "../../../../types/courseVersion.types.ts";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {COURSE_VERSIONS_URL} from "../../../../utils/apiUrl/courseVersionApiUrl.ts";
import {Button, Card, Divider} from "antd";
import EditCourseVersion from "./EditCourseVersion.tsx";
import {UploadOutlined} from "@ant-design/icons";

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

    const handleReload = () => {
        setReload(!reload);
    }

    return (
        <Card loading={loading} className="border-2 shadow-xl text-left min-w-80">
            <div className="text-right">
                <EditCourseVersion courseVersion={courseVersion} handleReload={handleReload}></EditCourseVersion>
            </div>
            <div className="flex flex-col justify-evenly md:flex-row w-full items-center">
                <div className="w-4/12 flex items-center gap-4 flex-col">
                    <img
                        className="w-full h-auto"
                        src="https://i.pinimg.com/564x/ce/57/82/ce57824d38e7921c16e0c621c13fedd6.jpg"
                        alt="Course Image"
                    />
                    <Button icon={<UploadOutlined/>}>Upload</Button>
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