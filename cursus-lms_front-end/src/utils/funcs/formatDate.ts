import {format} from "date-fns";

export const formatTimestamp = (timestamp: string | Date): string => {
    // Chuyển đổi timestamp sang đối tượng Date
    const date = new Date(timestamp);
    // Định dạng ngày giờ theo yêu cầu: DD/MM/YYYY HH:mm:ss
    return format(date, 'dd/MM/yyyy');
};