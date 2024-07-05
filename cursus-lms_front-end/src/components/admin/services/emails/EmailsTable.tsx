import {Button, Space, Table} from 'antd';
import type {TableProps} from 'antd';
import {IEmailTemplateDTO} from "../../../../types/email.types.ts";
import {useEffect, useState} from "react";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {EMAIL_TEMPLATES_URL} from "../../../../utils/apiUrl/emailTemplateApiUrl.ts";
import {FormOutlined} from "@ant-design/icons";
import {PATH_ADMIN} from "../../../../routes/paths.ts";
import {useNavigate} from "react-router-dom";

const EmailsTable = () => {
    const [dataSource, setDataSource] = useState<IEmailTemplateDTO[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    const columns: TableProps<IEmailTemplateDTO>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'templateName',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Sender',
            dataIndex: 'senderName',
            key: 'senderName',
        },
        {
            title: 'Email',
            dataIndex: 'senderEmail',
            key: 'senderEmail',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Language',
            key: 'language',
            dataIndex: 'language',
        },
        {
            title: 'Recipient',
            key: 'recipientType',
            dataIndex: 'recipientType',
        },
        {
            title: 'Action',
            key: 'action',
            render: (email) => (
                <Space size="middle">
                    <Button
                        onClick={() => navigate(PATH_ADMIN.emailsEdit + "?emailId=" + email.id)}
                        className={'bg-green-600'}
                        type="primary"
                    >
                        <FormOutlined/> Modify
                    </Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        const getEmailTemplates = async () => {
            const response = await axiosInstance.get<IResponseDTO<IEmailTemplateDTO[]>>(EMAIL_TEMPLATES_URL.GET_PUT_EMAILS(null));
            setDataSource(response.data.result);
            setLoading(false);
        }
        getEmailTemplates();
    }, []);

    return (
        <>
            <Table bordered={true} loading={loading} columns={columns} dataSource={dataSource}/>
        </>
    );
};

export default EmailsTable;
