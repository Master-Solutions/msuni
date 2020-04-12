import { Application } from './Application';
import { ComponentType } from 'react';

export interface BootstrapOptions {
   mainComponent?: string;
}

export const bootstrap = async (
   app: Application,
   options: BootstrapOptions = {}
): Promise<ComponentType> => {
   return await app.buildRoot(options.mainComponent || 'routing.routes');
};
