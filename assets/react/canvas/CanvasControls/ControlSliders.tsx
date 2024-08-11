import React from 'react';
import { Slider, Col } from 'antd';

interface ControlSlidersProps {
    controls: {
        angle: number;
        scale: number;
        top: number;
        left: number;
        skewX: number;
        skewY: number;
    };
    onControlChange: (property: keyof fabric.Object, value: number) => void;
    disabled: boolean;
}

const ControlSliders: React.FC<ControlSlidersProps> = ({ controls, onControlChange, disabled }) => {
    return (
        <>
            <Col span={24}>
                <label>Angle:</label>
                <Slider
                    value={controls.angle}
                    min={0}
                    max={360}
                    onChange={(value) => onControlChange('angle', value)}
                    disabled={disabled}
                />
            </Col>
            <Col span={24}>
                <label>Scale:</label>
                <Slider
                    value={controls.scale}
                    min={0.1}
                    max={3}
                    step={0.1}
                    onChange={(value) => onControlChange('scale', value)}
                    disabled={disabled}
                />
            </Col>
            <Col span={24}>
                <label>Top:</label>
                <Slider
                    value={controls.top}
                    min={0}
                    max={600}
                    onChange={(value) => onControlChange('top', value)}
                    disabled={disabled}
                />
            </Col>
            <Col span={24}>
                <label>Left:</label>
                <Slider
                    value={controls.left}
                    min={0}
                    max={800}
                    onChange={(value) => onControlChange('left', value)}
                    disabled={disabled}
                />
            </Col>
            <Col span={24}>
                <label>SkewX:</label>
                <Slider
                    value={controls.skewX}
                    min={0}
                    max={100}
                    onChange={(value) => onControlChange('skewX', value)}
                    disabled={disabled}
                />
            </Col>
            <Col span={24}>
                <label>SkewY:</label>
                <Slider
                    value={controls.skewY}
                    min={0}
                    max={100}
                    onChange={(value) => onControlChange('skewY', value)}
                    disabled={disabled}
                />
            </Col>
        </>
    );
};

export default ControlSliders;
