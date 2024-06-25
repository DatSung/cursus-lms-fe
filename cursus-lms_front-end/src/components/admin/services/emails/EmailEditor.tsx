import {useEffect, useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {Button, Form, Input} from 'antd';
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IEmailTemplateDTO} from "../../../../types/email.types.ts";
import {EMAIL_TEMPLATES_URL} from "../../../../utils/apiUrl/globalConfig.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";

interface IProps {
    emailId: string | null
}

const EmailEditor = (props: IProps) => {
    const [form] = Form.useForm();
    const editorRef = useRef(null);
    const [email, setEmail] = useState<IEmailTemplateDTO>();

    const setInitialFormValues = async () => {
        form.setFieldsValue({
            subjectLine: email?.subjectLine,
            preHeaderText: email?.preHeaderText,
            footerContent: email?.footerContent
        });
    }

    const onFinish = (values: any) => {
        console.log('Form values:', values);
        if (editorRef.current) {
            // @ts-ignore
            console.log('Editor content:', editorRef.current.getContent());
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
                    // onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={email?.bodyContent}
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
                <Button type="primary" htmlType="submit">
                    Save Template
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EmailEditor;
