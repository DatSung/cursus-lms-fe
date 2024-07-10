import axiosInstance from "../../utils/axios/axiosInstance.ts";
import {Button} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import {useState} from "react";

interface IProps {
    contentUrl: string;
    fileName: string;
}

const DownloadContent = (props: IProps) => {

    // Check if props.fileName is defined and not empty before using substring
    const shortName = props.fileName ? props.fileName.substring(props.fileName.lastIndexOf("_") + 1) : '';
    const [loading, setLoading] = useState<boolean>(false);

    const handleDownload = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(props.contentUrl, {responseType: 'blob'});
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', shortName);
            document.body.appendChild(link);
            link.click();
            // Clean up
            link.remove();
            setLoading(false);
        } catch (error) {
            console.error('Error downloading the file', error);
            setLoading(false)
        }
    };

    return (
        <Button
            loading={loading}
            onClick={handleDownload}
        >
            {shortName !== '' ? shortName : "No file upload"} <DownloadOutlined/>
        </Button>
    );
};

export default DownloadContent;
