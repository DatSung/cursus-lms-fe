import {useState} from "react";
import {Button, Form, Input, Modal, Select} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {IAddCategoryDTO, ICategoryDTO, IQueryParameters} from "../../../../types/category.types.ts";
import {CATEGORIES_URL} from "../../../../utils/apiUrl/categoryApiUrl.ts";
import toast from "react-hot-toast";

const {TextArea} = Input;
const {Option} = Select;

interface ParentItem {
    id: string;
    name: string;
}

interface IProps {
    handleReloadTable: () => void
}

const AddNewCategory = (props: IProps) => {
    const [form] = Form.useForm();
    const [parentOptions, setParentOptions] = useState<ParentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const query: IQueryParameters =
        {
            filterOn: '',
            filterQuery: '',
            sortBy: '',
            pageSize: 1000,
            pageNumber: 1,
            isAscending: true,
        };

    const showModal = async () => {
        setOpen(true);
        await getParentOptions();
        setLoading(false);
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

    const getParentOptions = async () => {
        try {
            const response = await axiosInstance.get<IResponseDTO<ICategoryDTO[]>>(CATEGORIES_URL.SEARCH_CATEGORIES_URL(query));
            setParentOptions(response.data.result);
        } catch (error) {
            console.error('Error fetching parent items:', error);
        }
    };

    return (
        <>
            <Button className={'bg-green-600'} type="primary" onClick={showModal}>
                <PlusOutlined/> Create category
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
                                <Option key={'root'} value={'root'}>
                                    Root
                                </Option>
                                {parentOptions.map(parent => (
                                    <Option key={parent.id} value={parent.id}>
                                        {parent.name}
                                    </Option>
                                ))}
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

export default AddNewCategory;