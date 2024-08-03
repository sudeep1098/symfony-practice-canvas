import { fabric } from 'fabric';
import { buildControls } from './controls';

declare module 'fabric' {
    namespace fabric {
        interface Object {
            getAngleInRadians(): number;
        }
    }
}

buildControls(fabric);

export { fabric };