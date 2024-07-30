import {startStimulusApp} from '@symfony/stimulus-bridge';
import {registerReactControllerComponents} from '@symfony/ux-react';

registerReactControllerComponents(require.context('./react/controllers', true, /\.[jt]sx?$/));
registerReactControllerComponents(require.context("./web/home/", true, /\.[jt]sx?$/));

declare global {
    interface Window {
        stimulusApp: any;
    }
}

let app = window.stimulusApp;

if (typeof app === 'undefined') {
    console.log('Starting Stimulus app...');
    app = startStimulusApp(require.context(
        '@symfony/stimulus-bridge/lazy-controller-loader!./controllers',
        true,
        /\.[jt]sx?$/
    ));
}

export {app}
