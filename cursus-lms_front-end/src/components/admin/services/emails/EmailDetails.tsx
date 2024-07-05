import {useEffect, useState} from "react";
import {IEmailTemplateDTO} from "../../../../types/email.types.ts";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {EMAIL_TEMPLATES_URL} from "../../../../utils/apiUrl/emailTemplateApiUrl.ts";
import {Card} from "antd";
import {formatTimestamp} from "../../../../utils/funcs/formatDate.ts";


interface IProps {
    emailId: string | null
}

const EmailDetails = (props: IProps) => {
    const [email, setEmail] = useState<IEmailTemplateDTO>({
        updateTime: new Date(),
        createTime: new Date(),
        bodyContent: "",
        callToAction: "",
        category: "",
        createBy: "",
        footerContent: "",
        id: "",
        language: "",
        personalizationTags: "",
        preHeaderText: "",
        recipientType: "",
        senderEmail: "",
        senderName: "",
        status: 0,
        subjectLine: "",
        templateName: "",
        updateBy: ""
    });

    useEffect(() => {
        const getEmailTemplate = async () => {
            const response = await axiosInstance.get<IResponseDTO<IEmailTemplateDTO>>(EMAIL_TEMPLATES_URL.GET_PUT_EMAILS(props.emailId));
            setEmail(response.data.result);

        }
        getEmailTemplate();
    }, []);

    return (
        <div>
            <Card title="Email Details" bordered={true} className={'drop-shadow-md text-left'}>
                <div className={'space-y-10'}>
                    <div className={'flex justify-between '}>
                        <strong>Template Name:</strong>
                        <p className={'text-right'}>{email?.templateName}</p>
                    </div>
                    <div className={'flex justify-between '}>
                        <strong>Sender Name:</strong>
                        <p className={'text-right'}>{email?.senderName}</p>
                    </div>
                    <div className={'flex justify-between '}>
                        <strong>Sender Email:</strong>
                        <p className={'text-right'}>{email?.senderEmail}</p>
                    </div>
                    <div className={'flex justify-between '}>
                        <strong>Category:</strong>
                        <p className={'text-right'}>{email?.category}</p>
                    </div>
                    <div className={'flex justify-between '}>
                        <strong>Language:</strong>
                        <p className={'text-right'}>{email?.language}</p>
                    </div>
                    <div className={'flex justify-between '}>
                        <strong>Recipient:</strong>
                        <p className={'text-right'}>{email?.recipientType}</p>
                    </div>
                    <div className={'flex justify-between '}>
                        <strong>Created By:</strong>
                        <p className={'text-right'}>{email?.createBy}</p>
                    </div>
                    <div className={'flex justify-between '}>
                        <strong>Created Time:</strong>
                        <p className={'text-right'}>{formatTimestamp(email?.createTime)}</p>
                    </div>
                    <div className={'flex justify-between '}>
                        <strong>Updated By:</strong>
                        <p className={'text-right'}>{email?.updateBy}</p>
                    </div>
                    <div className={'flex justify-between '}>
                        <strong>Updated Time:</strong>
                        <p className={'text-right'}>{formatTimestamp(email?.updateTime)}</p>
                    </div>
                    <div className={'flex justify-between '}>
                        <strong>Status:</strong>
                        <p className={'text-right'}>{email?.status == 1 ? 'New' : email?.status == 2 ? "Activated" : 'Deactivated'}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default EmailDetails;