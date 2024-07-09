import {Button, Card, Tabs, Upload, UploadProps} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {HOST_API_KEY} from "../../../../utils/apiUrl/globalConfig.ts";
import {getJwtTokenSession} from "../../../../auth/auth.utils.tsx";
import toast from "react-hot-toast";

interface IProps {
    detailsVersionId: string | null;
}


const ContentVersionCard = (props: IProps) => {

    const uploadProps: UploadProps = {
        name: 'file',
        action: `${HOST_API_KEY}/CourseVersion/section/details/content/${props.detailsVersionId}`,
        headers: {
            authorization: 'Bearer ' + getJwtTokenSession().accessToken,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                toast.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                toast.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const tabItems = [
        {
            label: 'Presentation',
            key: '1',
            children: (
                <div className="flex flex-col justify-center items-center">
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
                <div className="flex flex-col justify-center items-center">
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
                <div className="flex flex-col justify-center items-center">
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined/>}>Upload Video</Button>
                    </Upload>
                </div>
            ),
        },
    ];

    return (
        <>
            <Card title={'Content'}>
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