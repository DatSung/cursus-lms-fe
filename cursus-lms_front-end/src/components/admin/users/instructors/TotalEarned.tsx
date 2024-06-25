import {Card, Col, Statistic} from "antd";


const TotalEarned = () => {
    return (
        <>
            <Col>
                <Card title={'Earned'} bordered={true} className={'drop-shadow-md'}>
                    <Statistic
                        title={'USD'}
                        value={12500}
                        suffix={'$'}
                        precision={2}
                    />
                </Card>
            </Col>
        </>
    );
};

export default TotalEarned;