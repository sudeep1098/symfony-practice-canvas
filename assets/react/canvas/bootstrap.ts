import {startStimulusApp,} from '@symfony/stimulus-bridge';
import {registerReactControllerComponents} from '@symfony/ux-react';

registerReactControllerComponents(require.context('./', true, /\.[jt]sx?$/));

export const app = startStimulusApp(require.context(
    '@symfony/stimulus-bridge/lazy-controller-loader!../controllers',
    true,
    /\.[jt]sx?$/
));

window.stimulusApp = app;
