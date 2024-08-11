import React, { useContext, useEffect, useState } from 'react';
import { fabric } from '../helper/fabric';
import CanvasContext from '../helper/context';
import { Button, Input, Space } from 'antd';

const TextAdder: React.FC = () => {
    const canvas = useContext(CanvasContext);
    const [text, setText] = useState('');
    const [activeObject, setActiveObject] = useState<fabric.Textbox | fabric.IText | null>(null);

    useEffect(() => {
        if (canvas instanceof fabric.Canvas) {
            const updateActiveObject = () => {
                const obj = canvas.getActiveObject();
                if (obj && (obj instanceof fabric.Textbox || obj instanceof fabric.IText)) {
                    setActiveObject(obj);
                    setText(obj.get('text') || '');
                } else {
                    setActiveObject(null);
                    setText('');
                }
            };

            const handleSelectionCleared = () => {
                setActiveObject(null);
                setText('');
            };

            canvas.on('object:modified', updateActiveObject);
            canvas.on('selection:updated', updateActiveObject);
            canvas.on('selection:created', updateActiveObject);
            canvas.on('selection:cleared', handleSelectionCleared);

            // Initialize active object on component mount
            updateActiveObject();

            // Cleanup event listeners on component unmount
            return () => {
                canvas.off('object:modified', updateActiveObject);
                canvas.off('selection:updated', updateActiveObject);
                canvas.off('selection:created', updateActiveObject);
                canvas.off('selection:cleared', handleSelectionCleared);
            };
        }
    }, [canvas]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setText(newText);

        if (activeObject) {
            activeObject.set({ text: newText });
            canvas.requestRenderAll();
        }
    };

    const addTextToCanvas = () => {
        if (canvas instanceof fabric.Canvas) {
            if (text.trim() !== '') {
                const newText = new fabric.Textbox(text, {
                    left: 100,
                    top: 100,
                    fill: '#000000',
                    fontSize: 40,
                });
                canvas.add(newText);
                canvas.setActiveObject(newText);
                canvas.requestRenderAll();
                setText('');
            }
        }
    };

    return (
        <Space>
            <Input
                value={text}
                onChange={handleInputChange}
                placeholder="Enter text"
            />
            <Button onClick={addTextToCanvas} type="primary">Add Text</Button>
        </Space>
    );
};

export default TextAdder;
