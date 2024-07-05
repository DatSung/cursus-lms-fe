import {useState} from "react";
import {Button, Card, Dropdown, MenuProps, Modal} from 'antd';
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {CATEGORIES_URL} from "../../../../utils/apiUrl/categoryApiUrl.ts";
import {IAdminCategoryDTO, ICategoryDTO} from "../../../../types/category.types.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {formatTimestamp} from "../../../../utils/funcs/formatDate.ts";

interface IProps {
    categoryId: string | null;
}

interface MenuItem {
    id: string;
    name: string;
    description?: string | null;
    subCategories: ICategoryDTO[];
}

const CategoryDetails = (props: IProps) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<MenuProps['items']>([]);
    const [info, setInfo] = useState<IAdminCategoryDTO>({
        createTime: new Date(),
        createBy: "",
        description: "",
        id: "",
        name: "",
        parentId: "",
        parentName: "",
        status: 0,
        statusDescription: "",
        subCategories: [],
        updateBy: "",
        updateTime: new Date
    });

    const showModal = async () => {
        setOpen(true);
        setLoading(true);
        await getCategoryInfo();
        await getSubcategoriesInfo();
        setLoading(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const getCategoryInfo = async () => {
        const response = await axiosInstance.get<IResponseDTO<IAdminCategoryDTO>>(CATEGORIES_URL.GET_POST_PUT_DELETE_CATEGORY_URL(props.categoryId));
        setInfo(response.data.result);
    }

    const getSubcategoriesInfo = async () => {
        try {
            const response = await axiosInstance.get<IResponseDTO<ICategoryDTO[]>>(CATEGORIES_URL.GET_SUB_CATEGORIES_URL(props.categoryId));
            const data = response.data.result;

            const menuItems = data.map((item: MenuItem) => ({
                key: item.id,
                label: (
                    <p>
                        {item.name}
                    </p>
                ),
            }));

            setItems(menuItems);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <Button type="default" onClick={showModal}>
                Details
            </Button>
            <Modal
                open={open}
                onCancel={handleCancel}
                loading={loading}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                ]}
            >
                <div className={'flex gap-2'}>
                    <Card title="Details" bordered={false} style={{width: 300}}>
                        <p><strong>Name:</strong> {info?.name}</p>
                        <p><strong>Parent:</strong> {info?.parentName}</p>
                        <p><strong>Description:</strong> {info?.description}</p>
                        <Dropdown className={'mt-4'} menu={{items}} placement="bottomLeft" arrow>
                            <Button>Sub Categories</Button>
                        </Dropdown>
                    </Card>
                    <Card title="State" bordered={false} style={{width: 300}}>
                        <p><strong>Status:</strong> {info?.statusDescription}</p>
                        <p><strong>CreatedBy:</strong> {info?.createBy}</p>
                        <p><strong>CreatedTime:</strong> {formatTimestamp(info?.createTime)}</p>
                        <p><strong>UpdatedBy:</strong> {info?.updateBy}</p>
                        <p><strong>UpdatedTime:</strong> {formatTimestamp(info?.updateTime)}</p>
                    </Card>
                </div>

            </Modal>
        </>
    );
};

export default CategoryDetails;