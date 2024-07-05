import {useState} from "react";
import {Button, Form, Input, Modal, Select} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {IAddCategoryDTO} from "../../../../types/category.types.ts";
import {CATEGORIES_URL} from "../../../../utils/apiUrl/categoryApiUrl.ts";
import toast from "react-hot-toast";

const {TextArea} = Input;
const {Option} = Select;

interface IProps {
    handleReloadTable: () => void,
    parentId: string,
    parentName: string
}

const AddSubCategory = (props: IProps) => {
    const [form] = Form.useForm();
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);

    const showModal = async () => {
        setOpen(true);
        setInitialFormValues();
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onFinish = async (values: any) => {
        try {
            setSubmitLoading(true);
            const data: IAddCategoryDTO = {
                name: values.name,
                description: values.description,
                parentId: values.parentId
            }
            const response = await axiosInstance.post<IResponseDTO<string>>(CATEGORIES_URL.GET_POST_PUT_DELETE_CATEGORY_URL(null), data);
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
            // @ts-ignore
            toast.error(error.data.message);
            setSubmitLoading(false);
        }
    };

    const setInitialFormValues = () => {
        form.setFieldsValue({
            parentId: props.parentId || 'root',
        });
    }

    return (
        <>
            <Button className={'bg-green-600'} type="primary" onClick={showModal}>
                <PlusOutlined/> Add
            </Button>
            <Modal
                open={open}
                title={'Add a sub category'}
                onCancel={handleCancel}
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

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{required: true, message: 'Please input the description!'}]}
                        >
                            <TextArea rows={4}/>
                        </Form.Item>

                        <Form.Item
                            label="Parent"
                            name="parentId"
                            rules={[{required: true, message: 'Please select a parent!'}]}
                        >
                            <Select placeholder="Select a parent">
                                <Option key={props.parentId} value={props.parentId}>
                                    {props.parentName}
                                </Option>
                            </Select>
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

export default AddSubCategory;