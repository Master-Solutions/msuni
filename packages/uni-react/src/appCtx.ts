import React from 'react';
import { Application } from './Application';

export const appCtx = React.createContext<Application>(null);

export const Provider = appCtx.Provider;
export const Consumer = appCtx.Consumer;
