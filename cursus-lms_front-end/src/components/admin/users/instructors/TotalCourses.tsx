import {Card, Col, Row, Statistic} from 'antd';
import {useEffect, useState} from "react";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {ITotalCourses} from "../../../../types/instructor.types.ts";
import {INSTRUCTORS_URL} from "../../../../utils/apiUrl/instructorApiUrl.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";


interface IProps {
    instructorId: string;
}

const TotalCourses = (props: IProps) => {

    const [total, setTotal] = useState<ITotalCourses>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getTotalCourses = async () => {
            const response = await axiosInstance.get<IResponseDTO<ITotalCourses>>(INSTRUCTORS_URL.GET_TOTAL_COURSES_INSTRUCTOR_URL(props.instructorId));
            setTotal(response.data.result);
            setLoading(false)
        }
        getTotalCourses();
    }, []);

    return (
        <>
            <Col>
                <Card title={<>Courses: {total?.total} </>} bordered={true} className={'drop-shadow-md'}>
                    <Row className={'gap-4'}>
                        <Statistic
                            title={<p className={'text-green-800'}>Activated</p>}
                            value={total?.activated}
                            loading={loading}
                        />
                        <Statistic
                            title={<p className={'text-yellow-500'}>Pending</p>}
                            value={total?.pending}
                            loading={loading}
                        />
                        <Statistic
                            title={<p className={'text-red-400'}>Rejected</p>}
                            value={total?.rejected}
                            loading={loading}
                        />
                        <Statistic
                            title={<p className={'text-red-800'}>Deleted</p>}
                            value={total?.deleted}
                            loading={loading}
                        />
                    </Row>
                </Card>
            </Col>
        </>
    );
};

export default TotalCourses;