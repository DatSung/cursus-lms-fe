import {Card, Col, Row, Statistic} from "antd";
import {StarOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {IAvgRating} from "../../../../types/instructor.types.ts";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {INSTRUCTORS_URL} from "../../../../utils/apiUrl/instructorApiUrl.ts";

interface IProps {
    instructorId: string;
}

const TotalRating = (props: IProps) => {

    const [total, setTotal] = useState<IAvgRating>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getAvgRating = async () => {
            try {
                const response = await axiosInstance.get<IResponseDTO<IAvgRating>>(INSTRUCTORS_URL.GET_TOTAL_RATING_INSTRUCTOR_URL(props.instructorId));
                setTotal(response.data.result);
                setLoading(false)
            } catch (e) {
                setLoading(false)
            }
        }
        getAvgRating();
    }, []);

    return (
        <>
            <Col>
                <Card title={<>Rating: {total?.avg} <StarOutlined className={'text-yellow-500'}/></>} bordered={true}
                      className={'drop-shadow-md'}>
                    <Row className={'gap-6'}>
                        <Statistic
                            title={<> 1 <StarOutlined className={'text-yellow-500'}/></>}
                            value={total?.one}
                            loading={loading}
                        />
                        <Statistic
                            title={<> 2 <StarOutlined className={'text-yellow-500'}/></>}
                            value={total?.two}
                            loading={loading}
                        />
                        <Statistic
                            title={<> 3 <StarOutlined className={'text-yellow-500'}/></>}
                            value={total?.three}
                            loading={loading}
                        />
                        <Statistic
                            title={<> 4 <StarOutlined className={'text-yellow-500'}/></>}
                            value={total?.four}
                            loading={loading}
                        />
                        <Statistic
                            title={<> 5 <StarOutlined className={'text-yellow-500'}/></>}
                            value={total?.five}
                            loading={loading}
                        />
                    </Row>
                </Card>
            </Col>
        </>
    );
};

export default TotalRating;