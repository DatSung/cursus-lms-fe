import axiosInstance from "../../utils/axios/axiosInstance.ts";
import {Button} from "antd";
import {DownloadOutlined} from "@ant-design/icons";

interface IProps {
    contentUrl: string;
    fileName: string;
}

const DownloadContent = (props: IProps) => {

    // Check if props.fileName is defined and not empty before using substring
    const shortName = props.fileName ? props.fileName.substring(props.fileName.lastIndexOf("_") + 1) : '';

    const handleDownload = async () => {
        try {
            const response = await axiosInstance.get(props.contentUrl, {responseType: 'blob'});
            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', shortName);
            document.body.appendChild(link);
            link.click();

            // Clean up
            link.remove();
        } catch (error) {
            console.error('Error downloading the file', error);
        }
    };

    return (
        <Button onClick={handleDownload}>
            {shortName} <DownloadOutlined/>
        </Button>
    );
};

export default DownloadContent;
