import {Button, Card, Tabs, Upload, UploadProps} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {HOST_API_KEY} from "../../../../utils/apiUrl/globalConfig.ts";
import {getJwtTokenSession} from "../../../../auth/auth.utils.tsx";
import toast from "react-hot-toast";
import {COURSE_VERSIONS_URL} from "../../../../utils/apiUrl/courseVersionApiUrl.ts";
import VideoViewer from "../../../general/VideoViewer.tsx";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import DownloadContent from "../../../general/DownloadContent.tsx";
import {useEffect, useState} from "react";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {ISectionDetailVersionDTO} from "../../../../types/courseVersion.types.ts";

interface IProps {
    detailsVersionId: string | null;
}


const ContentVersionCard = (props: IProps) => {

    const [detailsInfo, setDetailInfo] = useState<ISectionDetailVersionDTO>({
        courseSectionDetail: "",
        currentStatus: "",
        docsUrl: "",
        id: "",
        name: "",
        slideUrl: "",
        type: 0,
        videoUrl: ""
    });
    const [reload, setReload] = useState<boolean>(false);
    const [videoKey, setVideoKey] = useState<number>(0);

    const uploadProps: UploadProps = {
        name: 'file',
        action: `${HOST_API_KEY}${COURSE_VERSIONS_URL.POST_DETAILS_CONTENT_VERSION(props.detailsVersionId)}`,
        headers: {
            authorization: 'Bearer ' + getJwtTokenSession().accessToken,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                toast.success(`${info.file.name} file uploaded successfully`);
                setReload(preReload => !preReload);
                setVideoKey(preVideoKey => preVideoKey + 1);
            } else if (info.file.status === 'error') {
                toast.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    useEffect(() => {
        const getDetailsInfo = async () => {
            try {
                const response = await axiosInstance.get<IResponseDTO<ISectionDetailVersionDTO>>(COURSE_VERSIONS_URL.GET_POST_PUT_DELETE_SECTION_DETAILS_VERSION(props.detailsVersionId));
                setDetailInfo(response.data.result);
            } catch (error) {
                console.error('Error getDetailsInfo', error);
            }
        }
        getDetailsInfo()
    }, [props.detailsVersionId, reload]);

    const videoUrl = `${HOST_API_KEY}${COURSE_VERSIONS_URL.GET_DETAILS_CONTENT_VERSION(props.detailsVersionId, 'video')}`;
    const docUrl = `${HOST_API_KEY}${COURSE_VERSIONS_URL.GET_DETAILS_CONTENT_VERSION(props.detailsVersionId, 'docx')}`;
    const slideUrl = `${HOST_API_KEY}${COURSE_VERSIONS_URL.GET_DETAILS_CONTENT_VERSION(props.detailsVersionId, 'slide')}`;

    const tabItems = [
        {
            label: 'Presentation',
            key: '1',
            children: (
                <div className="flex flex-col justify-center items-center gap-4">
                    <DownloadContent fileName={detailsInfo.slideUrl} contentUrl={slideUrl}></DownloadContent>
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined/>}>Upload Slide</Button>
                    </Upload>
                </div>
            ),
        },
        {
            label: 'Documentation',
            key: '2',
            children: (
                <div className="flex flex-col justify-center items-center gap-4">

                    <DownloadContent fileName={detailsInfo?.docsUrl} contentUrl={docUrl}></DownloadContent>

                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined/>}>Upload Doc</Button>
                    </Upload>
                </div>
            ),
        },
        {
            label: 'Visual Content',
            key: '3',
            children: (
                <div className="flex flex-col justify-center items-center gap-4">

                    <VideoViewer key={videoKey} videoUrl={videoUrl}></VideoViewer>

                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined/>}>Upload Video</Button>
                    </Upload>
                </div>
            ),
        },
    ];

    return (
        <>
            <Card title={`Content`}>
                {
                    props.detailsVersionId != null
                        ?
                        (
                            <Tabs defaultActiveKey="1" centered items={tabItems}/>
                        )
                        :
                        (
                            <p>
                                No details chosen
                            </p>
                        )
                }
            </Card>
        </>
    );
};

export default ContentVersionCard;