import React, { Context as ReactContext } from 'react';
import ResourceInfo from '../ResourceManagement/ResourceInfo';
import { Mixin, AnyConstructor } from '../../types';
import appCtx from '../../appCtx';
import { Context, ResourceTypes } from '../../../src';
import { ComponentsRegistryAspect } from '../ComponentRegistry/ComponentsRegistryAspect';
import { ResourceManagementAspect } from '../ResourceManagement/ResourceManagementAspect';

const APP_CONTEXT_KEY = 'app';

export const ReactContextProvidersAspect = <
   T extends AnyConstructor<Context & ResourceManagementAspect & ComponentsRegistryAspect>
>(
   base: T
) => {
   class ReactContextProviders extends base {
      constructor(...args: any[]) {
         super(...args);

         this.useReactContext(APP_CONTEXT_KEY, appCtx, { value: { app: this } });
      }

      useReactContext<T>(id: string, ctx: ReactContext<T>, options: any = {}) {
         return this.rm.add(new ResourceInfo(id, ResourceTypes.contexts, ctx, options));
      }

      getReactContext(id: string) {
         return this.rm.findByTypeAndId(ResourceTypes.contexts, id);
      }

      getReactContexts() {
         return this.rm.findByType(ResourceTypes.contexts);
      }

      getDefaultReactContext() {
         return this.getReactContext(APP_CONTEXT_KEY);
      }

      buildRootWithElement(el: any) {
         if (!React.isValidElement(el)) throw new Error(`${el} is not a valid element`);
         const ris = this.getReactContexts().reverse();
         let Wrapper = el;

         ris.forEach((ri) => {
            Wrapper = React.createElement(ri.value.Provider, ri.options, Wrapper);
         });

         return Wrapper;
      }

      // id of a component or <Component />
      buildRoot(main = 'main') {
         const Main = React.createElement(this.getComponent(main));
         return this.buildRootWithElement(Main);
      }
   }

   return ReactContextProviders;
};

export type ReactContextProvidersAspect = Mixin<typeof ReactContextProvidersAspect>;
