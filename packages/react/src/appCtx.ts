import React from 'react';
import { Application } from './Application';

export interface AppAware {
   app: Application;
}

export const appCtx = React.createContext<Partial<AppAware>>({});

export const Provider = appCtx.Provider;
export const Consumer = appCtx.Consumer;
