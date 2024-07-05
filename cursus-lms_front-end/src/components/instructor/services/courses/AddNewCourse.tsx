import {useState} from 'react';
import {Button, Form, Input, Modal, Select} from "antd";
import {ICategoryDTO, IQueryParameters} from "../../../../types/category.types.ts";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {CATEGORIES_URL} from "../../../../utils/apiUrl/categoryApiUrl.ts";
import toast from "react-hot-toast";
import {PlusOutlined} from "@ant-design/icons";
import {ICreateNewCourseAndVersionDTO} from "../../../../types/course.types.ts";

const {TextArea} = Input;
const {Option} = Select;

interface Category {
    id: string;
    name: string;
}

interface Level {
    id: string;
    name: string;
}

interface IProps {
    handleReloadTable: () => void
}

const AddNewCourse = (props: IProps) => {

    const [form] = Form.useForm();
    const [categories, setCategories] = useState<Category[]>([]);
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
        await getCategories();
        setLoading(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onFinish = async (values: ICreateNewCourseAndVersionDTO) => {
        try {
            setSubmitLoading(true);
            const data: ICreateNewCourseAndVersionDTO = {
                title: values.title,
                code: values.code,
                description: values.description,
                learningTime: values.learningTime,
                levelId: values.levelId,
                price: values.price,
                categoryId: values.code,

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
            setSubmitLoading(false);
        }
    };

    const getCategories = async () => {
        try {
            const response = await axiosInstance.get<IResponseDTO<ICategoryDTO[]>>(CATEGORIES_URL.SEARCH_CATEGORIES_URL(query));
            setCategories(response.data.result);
        } catch (error) {
            console.error('Error fetching parent items:', error);
        }
    };

    return (
        <>
            <Button className={'bg-green-600'} type="primary" onClick={showModal}>
                <PlusOutlined/> Create course
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
                            label="Code"
                            name="code"
                            rules={[{required: true, message: 'Please input the code!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Learning Time (hour)"
                            name="learningTime"
                            rules={[{required: true, message: 'Please input the learning time!'}]}
                        >
                            <Input type={'number'}/>
                        </Form.Item>

                        <Form.Item
                            label="Price (USD)"
                            name="price"
                            rules={[{required: true, message: 'Please input the price!'}]}
                        >
                            <Input type={'number'}/>
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{required: true, message: 'Please input the description!'}]}
                        >
                            <TextArea rows={4}/>
                        </Form.Item>

                        <Form.Item
                            label="Category"
                            name="categoryId"
                            rules={[{required: true, message: 'Please select a category!'}]}
                        >
                            <Select placeholder="Select a category">
                                {categories.map(category => (
                                    <Option key={category.id} value={category.id}>
                                        {category.name}
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

export default AddNewCourse;