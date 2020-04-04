import React from 'react';
import ReactDOM from 'react-dom';
import Application from "./Application";


class Bootstrapper {

    readonly app: Application;
    readonly elementId: string;
    readonly mainComponent: string;

    constructor(app: Application, options: any = {}) {
        this.app = app;

        this.elementId = options.elementId || 'root';
        this.mainComponent = options.mainComponent || 'routing.routes';
    }

    initialize() {

    }

    buildRoot() {
        const contexts = this.app.getReactContexts();
        const keys = Array.from(contexts.keys()).reverse();

        let Wrapper = React.createElement(this.app.getComponent(this.mainComponent));

        keys.forEach((key: string) => {
            const ctxDef = contexts.get(key);
            const props = ctxDef.options;
            Wrapper = React.createElement(ctxDef.ctx.Provider, props, Wrapper);
        });

        return Wrapper;
    }

    renderIntoDocument() {
        ReactDOM.render(
            this.buildRoot(),
            document.getElementById(this.elementId)
        )
    }

    run() {
        this.initialize();
        this.renderIntoDocument();
    }
}

export default Bootstrapper;