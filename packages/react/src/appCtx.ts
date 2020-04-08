import React from 'react';
import { Application } from './Application';

export interface AppAware {
   app: Application;
}

const appCtx = React.createContext<Partial<AppAware>>({});

export default appCtx;
