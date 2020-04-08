import { Application } from './Application';

export interface BootstrapOptions {
   mainComponent?: string;
}

export const bootstrap = async (app: Application, options: BootstrapOptions = {}) => {
   return app.buildRoot(options.mainComponent || 'routing.routes');
};
