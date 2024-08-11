import React, { useContext } from 'react';
import { fabric } from '@react/canvas/helper/fabric';
import CanvasContext from '../helper/context';
import { addImageToCanvas } from '../helper/utils';
import { Button } from 'antd';

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

    return (
        <Button onClick={handleAddImage}>Add Image</Button>
    );
};

export default ImageAdder;
