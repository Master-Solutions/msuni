import React from 'react';
import { Mixin, AnyConstructor } from '../../types';
import ResourceInfo from '../ResourceManagement/ResourceInfo';
import { ResourceManagementAspect } from '../ResourceManagement/ResourceManagementAspect';
import { Context, ResourceTypes } from '../../../src';
import { compose } from '../../utils/compose';

export const ComponentsRegistryAspect = <
   T extends AnyConstructor<Context & ResourceManagementAspect>
>(
   base: T
) => {
   class ComponentsRegistry extends base {
      useComponent(id: string, idOrComponent: string | React.ReactNode, hocs: Function[] = []) {
         const ri = new ResourceInfo(id, ResourceTypes.components, idOrComponent, { hocs });
         return this.rm.add(ri);
      }

      getComponent(id: string) {
         const ri = this.rm.findByTypeAndId(ResourceTypes.components, id);
         if (!ri) throw new Error(`Component '${id}' is not registered.`);

         let Component = ri.value;
         if (typeof Component === 'string') Component = this.getComponent(Component);

         return compose(...ri.options.hocs)(Component);
      }
   }

   return ComponentsRegistry;
};

export type ComponentsRegistryAspect = Mixin<typeof ComponentsRegistryAspect>;
