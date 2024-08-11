import React, { useEffect, useState } from 'react';
import { fabric } from './helper/fabric';
import CanvasControls from './CanvasControls/index';
import CanvasContext from './helper/context';
import { Col, Row } from 'antd';

const Canvas: React.FC = () => {
    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);

    useEffect(() => {
        const CanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
        if (CanvasElement && !fabricCanvas) {
            const canvas = new fabric.Canvas(CanvasElement);
            setFabricCanvas(canvas);

            const textbox = new fabric.Textbox('This is a Textbox object', {
                left: 100,
                top: 50,
                fill: '#880E4F',
                strokeWidth: 2,
            });
            canvas.add(textbox);
            canvas.requestRenderAll();
            console.log('Initial render:', canvas.toJSON());
        }
    }, [fabricCanvas]);

    useEffect(() => {
        if (fabricCanvas instanceof fabric.Canvas) {
            const handleObjectModified = (e: fabric.IEvent<Event>) => {
                console.log('Object modified:', e.target);
                fabricCanvas.getObjects().forEach(obj => {
                    console.log(`Object modified ${obj.type} :`, obj);
                });
            };

            const handleAfterRender = () => {
                console.log('After render:', fabricCanvas.toJSON());
                fabricCanvas.getObjects().forEach(obj => {
                    console.log(`Object render ${obj.type} after render:`, obj);
                });
            };

            fabricCanvas.on('object:modified', handleObjectModified);
            fabricCanvas.on('after:render', handleAfterRender);

            return () => {
                fabricCanvas.off('object:modified', handleObjectModified);
                fabricCanvas.off('after:render', handleAfterRender);
            };
        }
    }, [fabricCanvas]);

    return (
        <Row justify={'center'} className='p-2'>
            <Col span={10}>
                <canvas
                    id="canvas"
                    width="500"
                    height="400"
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
