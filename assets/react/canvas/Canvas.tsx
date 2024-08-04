import React, { useEffect, useRef, useState } from 'react';
import { fabric } from './helper/fabric';
import CanvasControls from './CanvasControls/index';
import CanvasContext from './helper/context';
import { Col, Row } from 'antd';

const Canvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);

    useEffect(() => {
        if (canvasRef.current && !fabricCanvas) {
            const canvas = new fabric.Canvas(canvasRef.current);
            setFabricCanvas(canvas);

            const rect = new fabric.Rect({
                left: 200,
                top: 100,
                fill: 'red',
                width: 200,
                height: 100,
            });
            fabric.Image.fromURL('https://picsum.photos/seed/picsum/200/300', function (img) {
                img.scale(0.5).set('flipX', true);
                img.set({ left: 100, top: 100 });
                canvas.add(img);
            });

            canvas.add(rect);
            canvas.renderAll();

            console.log(canvas._objects);
        }
    }, [fabricCanvas]);

    return (
        <>
            <Row justify={'center'}>
                <Col span={10}>
                    <canvas
                        ref={canvasRef}
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
        </>
    );
};

export default Canvas;
