import {useState} from 'react';
import {Button, Form, Input, Modal} from "antd";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import toast from "react-hot-toast";
import {PlusOutlined} from "@ant-design/icons";
import {ICreateSectionDetailVersionDTO} from "../../../../types/courseVersion.types.ts";
import {COURSE_VERSIONS_URL} from "../../../../utils/apiUrl/courseVersionApiUrl.ts";

interface IProps {
    handleReloadTable: () => void,
    sectionVersionId: string | null;
}

const AddNewDetailsVersion = (props: IProps) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);

    const showModal = async () => {
        setOpen(true);
        setLoading(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onFinish = async (values: ICreateSectionDetailVersionDTO) => {
        try {
            setSubmitLoading(true);
            const data: ICreateSectionDetailVersionDTO = {
                courseSectionVersionId: props.sectionVersionId,
                name: values.name
            }
            const response = await axiosInstance.post<IResponseDTO<string>>(COURSE_VERSIONS_URL.GET_POST_PUT_DELETE_SECTION_DETAILS_VERSION(null), data);
            const result = response.data;
            setSubmitLoading(false);
            if (result.isSuccess) {
                toast.success(result.message);
                props.handleReloadTable();
                form.resetFields();
                setOpen(false);
            } else {
                toast.error(result.message);
                setSubmitLoading(false);
            }
        } catch (error) {
            setSubmitLoading(false);
        }
    };

    return (
        <>
            <Button className={`bg-green-600`} type="primary" onClick={showModal}>
                <PlusOutlined/> Create details
            </Button>
            <Modal
                open={open}
                title={'Create a new details'}
                onCancel={handleCancel}
                loading={loading}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                ]}
            >
                <div className={'flex w-full gap-2'}>
                    <Form className={'w-full'} form={form} onFinish={onFinish} layout="vertical">
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{required: true, message: 'Please input the name!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item>
                            <Button loading={submitLoading} className={'bg-green-600'} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </Modal>
        </>
    );
};

export default AddNewDetailsVersion;