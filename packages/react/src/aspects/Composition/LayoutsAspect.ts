import { Mixin, AnyConstructor } from '../../types';
import { DefaultLayout } from './DefaultLayout';
import ResourceInfo from '../ResourceManagement/ResourceInfo';
import { ComponentsRegistryAspect } from '../ComponentRegistry/ComponentsRegistryAspect';
import { ResourceManagementAspect } from '../ResourceManagement/ResourceManagementAspect';
import { Context } from '../../Context';
import { ResourceTypes } from '../../constants';

export interface LayoutProps {
   id: string;
   component: string;
   widgets: string[];
}

const DEFAULT_LAYOUT_KEY = 'default';
const COMPONENT_DEFAULT_LAYOUT_KEY = `layouts.${DEFAULT_LAYOUT_KEY}`;

export const LayoutsAspect = <
   T extends AnyConstructor<Context & ResourceManagementAspect & ComponentsRegistryAspect>
>(
   base: T
) => {
   class Layouts extends base {
      constructor(...args: any[]) {
         super(...args);

         this.useComponent(COMPONENT_DEFAULT_LAYOUT_KEY, DefaultLayout);
      }

      useLayout(layout: LayoutProps) {
         return this.rm.add(new ResourceInfo(layout.id, ResourceTypes.layouts, layout));
      }

      getLayout(id: string) {
         return this.rm.findByTypeAndId(ResourceTypes.layouts, id).value;
      }
   }

   return Layouts;
};

export type LayoutsAspect = Mixin<typeof LayoutsAspect>;
