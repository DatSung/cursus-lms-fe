import {ISectionDetailVersionDTO} from "../../../../types/courseVersion.types.ts";
import {Button, Card, Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import EditDetailsVersion from "./EditDetailsVersion.tsx";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {COURSE_VERSIONS_URL} from "../../../../utils/apiUrl/courseVersionApiUrl.ts";
import toast from "react-hot-toast";

interface IProps {
    sectionDetailVersion: ISectionDetailVersionDTO[];
    handleReloadTable: () => void
}

const DetailsVersionList = (props: IProps) => {

    const confirmDelete = (detailsVersionId: string) => {
        return new Promise((resolve, reject) => {
            axiosInstance.delete<IResponseDTO<string>>(COURSE_VERSIONS_URL.GET_POST_PUT_DELETE_SECTION_DETAILS_VERSION(detailsVersionId))
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
                    console.error('Error cloning course version:', error);
                    resolve(error);
                });

        });
    };

    const renderDetailsVersions = (sectionDetailVersion: ISectionDetailVersionDTO[]) => {

        return sectionDetailVersion.map((detailsVersion) => (
            <div className={'w-full flex items-center justify-between'} key={detailsVersion.id}>
                <a onClick={() => alert('s')}>{detailsVersion.name}</a>
                <div className={'flex gap-2'}>
                    <EditDetailsVersion
                        handleReloadTable={props.handleReloadTable}
                        detailsVersion={detailsVersion}
                    >
                    </EditDetailsVersion>
                    <Popconfirm
                        className={'bg-gray-100'}
                        title="Confirmation"
                        description="Are you sure to delete this details ?"
                        onConfirm={() => confirmDelete(detailsVersion.id)}
                        onOpenChange={() => console.log('open change')}
                    >
                        <Button
                            className={'bg-red-500 px-1.5'}
                            type="primary"
                            block
                        >
                            <DeleteOutlined/>
                        </Button>
                    </Popconfirm>
                </div>
            </div>
        ));
    };

    return (
        <>
            <Card className={'w-full'} title={'Details'}>
                {
                    props.sectionDetailVersion.length > 0
                        ?
                        <div className={'flex flex-col gap-4'}>
                            {renderDetailsVersions(props.sectionDetailVersion)}
                        </div>
                        :
                        <p>There are no section details</p>
                }
            </Card>
        </>
    );
};

export default DetailsVersionList;