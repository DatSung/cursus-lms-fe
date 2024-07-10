import {Button, List, Popconfirm} from 'antd';
import {ICourseSectionVersionDTO} from "../../../../types/courseVersion.types.ts";
import {DeleteOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {PATH_INSTRUCTOR} from "../../../../routes/paths.ts";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {COURSE_VERSIONS_URL} from "../../../../utils/apiUrl/courseVersionApiUrl.ts";
import toast from "react-hot-toast";

interface IProps {
    courseSectionVersion: ICourseSectionVersionDTO[];
    handleReloadTable: () => void
}

const SectionVersionList = (props: IProps) => {
    const navigate = useNavigate();

    const confirmDelete = (sectionVersionId: string) => {
        return new Promise((resolve, reject) => {
            axiosInstance.delete<IResponseDTO<string>>(COURSE_VERSIONS_URL.GET_DELETE_COURSE_SECTION_VERSION(sectionVersionId))
                .then((response) => {
                    const result = response.data;
                    if (result.isSuccess) {
                        toast.success(result.message);
                        props.handleReloadTable()
                        resolve(result);
                    } else {
                        toast.error(result.message);
                        reject(new Error(result.message));
                    }
                })
                .catch((error) => {
                    console.error('Error delete course section version:', error);
                    resolve(error);
                });
        });
    };

    return (
        <List
            className="w-full"
            dataSource={props.courseSectionVersion}
            renderItem={(item) => (
                <List.Item className={'w-full'} key={item.id}>
                    <List.Item.Meta
                        title={<a href="#">{item.title}</a>}
                        description={item.description}
                    />
                    <div className={'flex gap-2'}>
                        <Button
                            onClick={() => navigate(PATH_INSTRUCTOR.sectionVersionDetails + "?sectionVersionId=" +  item.id)}
                            className={'bg-green-600'}
                            type="primary"
                        >
                            <InfoCircleOutlined /> Details
                        </Button>
                        <Popconfirm
                            className={'bg-gray-100'}
                            title="Confirmation"
                            description="Are you sure to delete this details ?"
                            onConfirm={() => confirmDelete(item.id)}
                            onOpenChange={() => console.log('open change')}
                        >
                            <Button
                                className={'bg-red-600'}
                                type="primary"
                            >
                                <DeleteOutlined />Delete
                            </Button>
                        </Popconfirm>

                    </div>
                </List.Item>
            )}
        />
    );
};

export default SectionVersionList;