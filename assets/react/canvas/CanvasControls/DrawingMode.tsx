    
import React, { useContext } from 'react';
import { Col, ColorPicker, Select } from 'antd';
import CanvasContext from '../helper/context';
// import { handleBrushChange } from '@react/canvas/helper/utils';

const DrawingMode = () => {
    const canvas = useContext(CanvasContext);

    const handleColorChange = (value: any) => {
        if (canvas) {
            canvas.freeDrawingBrush.color = value.hex;
        }
    };

    return (
        <>
            <Col span={2}>
                {/* <ColorPicker defaultValue="#1677ff" onChange={handleColorChange} /> */}
            </Col>
            <Col span={10}>
                <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    // onChange={(value) => handleBrushChange(canvas, value)}
                    options={[
                        { value: 'hline', label: 'hline' },
                        { value: 'vline', label: 'vline' },
                        { value: 'square', label: 'square' },
                        { value: 'diamond', label: 'diamond' },
                    ]}
                />
            </Col>
        </>
    );
};

export default DrawingMode;
