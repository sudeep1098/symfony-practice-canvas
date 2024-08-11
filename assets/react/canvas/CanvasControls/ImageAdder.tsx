import React, { useContext } from 'react';
import { fabric } from '@react/canvas/helper/fabric';
import CanvasContext from '../helper/context';
import { addImageToCanvas, addSVGToCanvas } from '../helper/utils';
import { Button, Col, Row } from 'antd';
import { deleteIcon } from '../helper/icons';

const ImageAdder: React.FC = () => {
    const canvas = useContext(CanvasContext);

    const handleAddImage = () => {
        if (canvas instanceof fabric.Canvas) {
            addImageToCanvas(canvas, 'https://picsum.photos/seed/picsum/200/300', {
                scaleX: 0.5,
                scaleY: 0.5,
            });
        }
    };

    const handleAddSVG = () => {
        if (canvas instanceof fabric.Canvas) {
            addSVGToCanvas(canvas, deleteIcon, {
                scaleX: 0.3,
                scaleY: 0.3,
            });
        }
    };

    return (
        <Row gutter={[8,8]}>
        <Col>
            <Button onClick={handleAddImage}>Add Image</Button>
        </Col>
        <Col>
            <Button onClick={handleAddSVG}>Add SVG</Button>
        </Col>
        </Row>
    );
};

export default ImageAdder;
