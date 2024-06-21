import SignalRService from "../../../../utils/signalR/signalRService.ts";
import {useEffect, useState} from "react";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {INSTRUCTORS_URL} from "../../../../utils/apiUrl/globalConfig.ts";


const InstructorsTable = () => {
    const [message, setMessage] = useState<string>("");


    useEffect(() => {
        SignalRService.on("DownloadExcelNow", async (fileName: string) => {
            setMessage(fileName);
            const response = await axiosInstance.get(INSTRUCTORS_URL.DOWNLOAD_INSTRUCTORS_URL(fileName), {responseType: 'blob'});
            // Tạo một URL từ blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            // Tên file khi tải về
            link.setAttribute('download', `${fileName}.xlsx`);

            // Thêm link vào document và click để tải file
            document.body.appendChild(link);
            link.click();

            // Xóa link sau khi tải xong
            link.parentNode?.removeChild(link);
        });
    }, []);

    return (
        <div>
            <h1>SignalR with React and TypeScript</h1>
            <p>{message}</p>
        </div>
    );
};

export default InstructorsTable;