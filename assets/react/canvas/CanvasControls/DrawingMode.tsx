import React, { useContext, useState } from 'react';
import { Col, Row, ColorPicker, Select, Slider } from 'antd';
import CanvasContext from '../helper/context';
import { handleBrushChange } from '@react/canvas/helper/utils';
import { fabric } from "@react/canvas/helper/fabric";
import 'bootstrap/dist/css/bootstrap.min.css';

const DrawingMode: React.FC = () => {
    const canvas = useContext(CanvasContext);

    const handleColorChange = (value: any) => {
        if (canvas) {
            const color = value.metaColor;
            if (color) {
                canvas.freeDrawingBrush.color = "#" + color.toHex();
            }
        }
    };

    const handleBrushWidthChange = (value: number) => {
        if (canvas && canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.width = value;
        }
    };

    const updateShadow = (shadowProps: Partial<fabric.Shadow>) => {
        if (canvas && canvas.freeDrawingBrush) {
            const currentShadow = canvas.freeDrawingBrush.shadow instanceof fabric.Shadow
                ? canvas.freeDrawingBrush.shadow
                : new fabric.Shadow({ blur: 0, offsetX: 0, offsetY: 0, affectStroke: true, color: '#000000' });

            canvas.freeDrawingBrush.shadow = new fabric.Shadow({
                ...currentShadow,
                ...shadowProps
            });
        }
    };

    const handleShadowBlurChange = (value: number) => {
        updateShadow({ blur: value });
    };

    const handleShadowOffsetXChange = (value: number) => {
        updateShadow({ offsetX: value });
    };

    const handleShadowOffsetYChange = (value: number) => {
        updateShadow({ offsetY: value });
    };

    return (
        <Row>
            <Col className='mt-1' span={12}>
                <label>Color:</label>
                <ColorPicker defaultValue="#000000" onChange={(value) => { handleColorChange(value) }} />
            </Col>
            <Col span={12}>
                <label>Mode:</label>
                <Select
                    defaultValue="pencil"
                    style={{ width: 120 }}
                    onChange={(value) => handleBrushChange(canvas, value)}
                    options={[
                        { value: 'pencil', label: 'Pencil' },
                        { value: 'circle', label: 'Circle' },
                        { value: 'hline', label: 'Horizontal Line' },
                        { value: 'vline', label: 'Vertical Line' },
                        { value: 'square', label: 'Square' },
                        { value: 'diamond', label: 'Diamond' },
                    ]}
                />
            </Col>
            <Col span={24}>
                <label>Brush Width:</label>
                <Slider
                    defaultValue={10}
                    min={1}
                    max={100}
                    onChange={handleBrushWidthChange}
                />
            </Col>
            <Col span={24}>
                <label>Shadow Blur:</label>
                <Slider
                    defaultValue={0}
                    min={0}
                    max={50}
                    onChange={handleShadowBlurChange}
                />
            </Col>
            <Col span={24}>
                <label>Shadow Offset X:</label>
                <Slider
                    defaultValue={0}
                    min={-50}
                    max={50}
                    onChange={handleShadowOffsetXChange}
                />
            </Col>
            <Col span={24}>
                <label>Shadow Offset Y:</label>
                <Slider
                    defaultValue={0}
                    min={-50}
                    max={50}
                    onChange={handleShadowOffsetYChange}
                />
            </Col>
        </Row>
    );
};

export default DrawingMode;
