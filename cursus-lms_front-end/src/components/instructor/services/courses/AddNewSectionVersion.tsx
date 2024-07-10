import {useState} from 'react';
import {Button, Form, Input, Modal} from "antd";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import toast from "react-hot-toast";
import {PlusOutlined} from "@ant-design/icons";
import {ICreateCourseSectionVersionDTO} from "../../../../types/courseVersion.types.ts";
import {COURSE_VERSIONS_URL} from "../../../../utils/apiUrl/courseVersionApiUrl.ts";

const {TextArea} = Input;

interface IProps {
    handleReloadTable: () => void,
    courseVersionId: string | null;
}

const AddNewSectionVersion = (props: IProps) => {

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

    const onFinish = async (values: ICreateCourseSectionVersionDTO) => {
        try {
            setSubmitLoading(true);
            const data: ICreateCourseSectionVersionDTO = {
                courseVersionId: props.courseVersionId,
                title: values.title,
                description: values.description,
            }
            const response = await axiosInstance.post<IResponseDTO<string>>(COURSE_VERSIONS_URL.CREATE_COURSE_SECTION_VERSION(), data);
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
                <PlusOutlined/> Create section
            </Button>
            <Modal
                open={open}
                title={'Create a new category'}
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
                            label="Title"
                            name="title"
                            rules={[{required: true, message: 'Please input the title!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{required: true, message: 'Please input the description!'}]}
                        >
                            <TextArea rows={4}/>
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

export default AddNewSectionVersion;