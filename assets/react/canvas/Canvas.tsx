import React, { useEffect, useState } from 'react';
import { fabric } from './helper/fabric';
import CanvasControls from './CanvasControls/index';
import CanvasContext from './helper/context';
import { Col, Row } from 'antd';

const Canvas: React.FC = () => {
    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);

    useEffect(() => {
        if (!fabricCanvas) {
            const CanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
            if (CanvasElement) {
                const canvas = new fabric.Canvas(CanvasElement);
                setFabricCanvas(canvas);

                fabric.Image.fromURL('https://picsum.photos/seed/picsum/200/300', function (img) {
                    img.scale(0.5).set('flipX', true);
                    img.set({ left: 100, top: 100 });
                    canvas.add(img);
                });

                canvas.renderAll();

                console.log(canvas._objects);
            }
        }
    }, [fabricCanvas]);

    return (
        <Row justify={'center'}>
            <Col span={10}>
                <canvas
                    id="canvas"
                    width="500"
                    height="300"
                    style={{ border: '1px solid #000000' }}
                />
            </Col>
            <Col span={12}>
                {fabricCanvas && (
                    <CanvasContext.Provider value={fabricCanvas}>
                        <CanvasControls />
                    </CanvasContext.Provider>
                )}
            </Col>
        </Row>
    );
};

export default Canvas;
