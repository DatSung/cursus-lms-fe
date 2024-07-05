import {useEffect, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {Button, Form, Input} from 'antd';
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IEmailTemplateDTO, IUpdateEmailTemplateDTO} from "../../../../types/email.types.ts";
import {EMAIL_TEMPLATES_URL} from "../../../../utils/apiUrl/emailTemplateApiUrl.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import toast from "react-hot-toast";

interface IProps {
    emailId: string | null
}

interface IFormValue {
    footerContent: string,
    preHeaderText: string,
    subjectLine: string
}

const EmailEditor = (props: IProps) => {
    const [form] = Form.useForm();
    const [email, setEmail] = useState<IEmailTemplateDTO>();
    const [editorContent, setEditorContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const setInitialFormValues = async () => {
        form.setFieldsValue({
            subjectLine: email?.subjectLine,
            preHeaderText: email?.preHeaderText,
            footerContent: email?.footerContent
        });
    }

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
    };

    const onFinish = async (values: IFormValue) => {
        try {
            setLoading(true);
            const data: IUpdateEmailTemplateDTO = {
                templateName: email?.templateName ? email?.templateName : '',
                senderName: email?.senderName ? email?.senderName : '',
                senderEmail: email?.senderEmail ? email?.senderEmail : '',
                category: email?.category ? email?.category : '',
                subjectLine: values.subjectLine,
                preHeaderText: values.preHeaderText,
                personalizationTags: email?.personalizationTags ? email.personalizationTags : '',
                bodyContent: editorContent,
                footerContent: values.footerContent,
                callToAction: email?.callToAction ? email?.callToAction : '',
                language: email?.language ? email.language : '',
                recipientType: email?.recipientType ? email?.recipientType : '',
                status: email?.status ? email.status : 0,
            }

            const response = await axiosInstance.put<IResponseDTO<string>>(EMAIL_TEMPLATES_URL.GET_PUT_EMAILS(email?.id ? email.id : null), data);
            if (response.status === 200) {
                toast.success(response.data.message)
                setLoading(false);
            } else {
                setLoading(false);
                toast.error(response.data.message);
            }

        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    };

    useEffect(() => {
        const getEmailTemplate = async () => {
            const response = await axiosInstance.get<IResponseDTO<IEmailTemplateDTO>>(EMAIL_TEMPLATES_URL.GET_PUT_EMAILS(props.emailId));
            setEmail(response.data.result);

        }
        getEmailTemplate();
    }, []);


    setInitialFormValues();

    return (
        <Form onFinish={onFinish} form={form} layout="vertical">
            <Form.Item
                label="Subject"
                name="subjectLine"
                rules={[{required: true, message: 'Please input the email subject!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Header"
                name="preHeaderText"
                rules={[{required: true, message: 'Please input the email header!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Email Content"
                name="content"
                rules={[{required: true, message: 'Please input the email content!'}]}
            >
                <Editor
                    apiKey='9v3f6801xkjbo5g8uijy1kuncu1ltgp0khqtlsn6d9oulwdj'
                    onEditorChange={(a) => handleEditorChange(a)}
                    initialValue={email?.bodyContent}
                    value={email?.bodyContent}
                    init={{
                        menubar: false,
                        plugins: 'anchor autolink charmap codesample emoticons link lists searchreplace table visualblocks wordcount linkchecker markdown',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat'
                    }}
                />
            </Form.Item>

            <Form.Item
                label="Footer"
                name="footerContent"
                rules={[{required: true, message: 'Please input the email footer!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item>
                <Button
                    className={'bg-green-600'} type="primary" htmlType="submit"
                    loading={loading}
                >
                    Save Template
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EmailEditor;
