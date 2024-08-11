import { Button, Col, Row } from 'antd'
import React, { useContext } from 'react'
import { addCircle, addEllipse, addRectangle, addTriangle } from '../helper/utils';
import CanvasContext from '../helper/context';

const Shapes = () => {
    const canvas = useContext(CanvasContext);
    return (
        <Row justify={'center'} gutter={[8, 8]}>
            <Col>
                <Button onClick={() => addRectangle(canvas)}>Add Rectangle</Button>
            </Col>
            <Col>
                <Button onClick={() => addCircle(canvas)}>Add Circle</Button>
            </Col>
            <Col>
                <Button onClick={() => addTriangle(canvas)}>Add Triangle</Button>
            </Col>
            <Col>
                <Button onClick={() => addEllipse(canvas)}>Add Ellipse</Button>
            </Col>
        </Row>
    )
}

export default Shapes