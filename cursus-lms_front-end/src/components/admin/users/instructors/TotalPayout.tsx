import {Card, Col, Statistic} from "antd";


const TotalPayout = () => {
    return (
        <>
            <Col>
                <Card title={'Payout'} bordered={true} className={'drop-shadow-md'}>
                    <Statistic
                        title={'USD'}
                        value={1522}
                        suffix={'$'}
                        precision={2}
                    />
                </Card>
            </Col>
        </>
    );
};

export default TotalPayout;