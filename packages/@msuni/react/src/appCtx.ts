import React from "react";
import Application from "./Application";

export interface IAppAware {
    app: Application
}

const appCtx = React.createContext<Partial<IAppAware>>({});

export default appCtx;