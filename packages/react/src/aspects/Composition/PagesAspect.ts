import { Mixin, AnyConstructor } from '../../types';
import { Page } from './Page';
import ResourceInfo from '../ResourceManagement/ResourceInfo';
import withProps from '../../utils/withProps';
import { ResourceManagementAspect } from '../ResourceManagement/ResourceManagementAspect';
import { ComponentsRegistryAspect } from '../ComponentRegistry/ComponentsRegistryAspect';
import { Context } from '../../Context';
import { ResourceTypes } from '../../constants';

export interface Widget {
   id: string;
   region?: string;
   key?: string;
   props?: object;
}

export interface PageProps {
   id: string;
   name: string;
   layout?: string;
   widgets: (string | Widget)[];
   data?: object;
}

export const PagesAspect = <
   T extends AnyConstructor<Context & ResourceManagementAspect & ComponentsRegistryAspect>
>(
   base: T
) => {
   class Pages extends base {
      constructor(...args: any[]) {
         super(...args);

         this.useComponent('page', Page);
      }

      usePage(page: PageProps) {
         return this.rm.add(new ResourceInfo(page.id, ResourceTypes.pages, page));
      }

      getPage(id: string) {
         return this.rm.findByTypeAndId(ResourceTypes.pages, id).value;
      }

      getPages() {
         return this.rm.findByType(ResourceTypes.pages);
      }

      buildPage(id: string) {
         const pageProps = this.getPage(id);
         return withProps(pageProps)(Page);
      }
   }

   return Pages;
};

export type PagesAspect = Mixin<typeof PagesAspect>;
