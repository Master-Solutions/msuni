import {Context as ReactContext} from 'react';
import {AnyConstructor, Mixin} from "../../uni/Mixin";
import {IResourceManagementAspect} from "./ResourceManagementAspect";
import {ResourceTypes} from "../constants";
import Context from "../../uni/Context";
import appCtx from "../appCtx";


export interface IReactContextProvidersAspect {
    getDefaultReactContext(): any
}

const APP_CONTEXT_KEY = 'app';

export const ReactContextProvidersAspectMixin =
    <T extends AnyConstructor<Context & IResourceManagementAspect>>(base : T) =>
    {
        class ReactContextProvidersAspect extends base implements IReactContextProvidersAspect {

            constructor(...args: any[]) {
                super(...args);

                this.useResourceType(ResourceTypes.contexts);

                this.useReactContext(APP_CONTEXT_KEY, appCtx, {value: {app: this}});
            }

            useReactContext<T>(key: string, ctx: ReactContext<T>, options: any = {}) {
                const obj = {ctx, options};
                return this.useResource(ResourceTypes.contexts, key, obj, options);
            }

            getReactContext(key: string) {
                return this.getResource(ResourceTypes.contexts, key);
            }

            getReactContexts() {
                return this.getResourcesByType(ResourceTypes.contexts);
            }

            getDefaultReactContext() {
                return this.getReactContext(APP_CONTEXT_KEY);
            }
        }

        return ReactContextProvidersAspect
    };

export type ReactContextProvidersAspectMixin = Mixin<typeof ReactContextProvidersAspectMixin>;


