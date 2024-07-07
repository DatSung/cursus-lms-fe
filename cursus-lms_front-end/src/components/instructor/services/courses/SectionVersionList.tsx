import {Button, List} from 'antd';
import {ICourseSectionVersionDTO} from "../../../../types/courseVersion.types.ts";
import {DeleteOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {PATH_INSTRUCTOR} from "../../../../routes/paths.ts";

interface IProps {
    courseSectionVersion: ICourseSectionVersionDTO[];
}

const SectionVersionList = (prop: IProps) => {
    const navigate = useNavigate();
    return (
        <List
            className="w-full"
            dataSource={prop.courseSectionVersion}
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
                        <Button
                            className={'bg-red-600'}
                            type="primary"
                        >
                            <DeleteOutlined />Delete
                        </Button>
                    </div>
                </List.Item>
            )}
        />
    );
};

export default SectionVersionList;