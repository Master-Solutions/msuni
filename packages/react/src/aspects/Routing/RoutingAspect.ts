import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { AnyConstructor, Mixin } from '../../types';
import { ReactContextProvidersAspect } from '../Composition/ReactContextProvidersAspect';
import ResourceInfo from '../ResourceManagement/ResourceInfo';
import { withAppRoutes } from '../../utils/withAppRoutes';
import { PagesAspect } from '../Composition/PagesAspect';
import { ResourceManagementAspect } from '../ResourceManagement/ResourceManagementAspect';
import { ComponentsRegistryAspect } from '../ComponentRegistry/ComponentsRegistryAspect';
import { Context } from '../../Context';
import { ResourceTypes } from '../../constants';

export interface RouteProps {
   path: string;
   exact?: boolean;
   page: string;
   type?: string;
}

export interface RoutesProps {
   routes: RouteProps[];
}

export const RoutingAspect = <
   T extends AnyConstructor<
      Context &
         ResourceManagementAspect &
         ComponentsRegistryAspect &
         ReactContextProvidersAspect &
         PagesAspect
   >
>(
   base: T
) => {
   class Routing extends base {
      constructor(...args: any[]) {
         super(...args);

         this.useComponent('routing.router', BrowserRouter);
         this.useComponent('routing.switch', Switch);
         this.useComponent('routing.link', Link);
         this.useComponent('routing.redirect', Redirect);
         this.useComponent(`routing.route`, Route);

         this.useComponent(`routing.routes`, this.createRoutes(), [withAppRoutes]);
      }

      useRoute(route: RouteProps) {
         return this.rm.add(new ResourceInfo(route.path, ResourceTypes.routes, route));
      }

      getRoutes() {
         return this.rm.findByType(ResourceTypes.routes).map((ri) => ri.value);
      }

      createRoute(props: RouteProps) {
         const type = props.type;

         const pageProps = this.getPage(props.page);
         if (!pageProps) throw new Error(`Route page ${props.page} is not registered`);

         const routeComponentKey = type ? `routing.${type}_route` : 'routing.route';
         const Route = this.getComponent(routeComponentKey);
         if (!Route)
            throw new Error(
               `Component '${routeComponentKey}' for route type '${type}' is not registered`
            );

         const Page = this.getComponent('page');
         if (!Page) throw new Error(`Page component is not registered`);

         const routeProps = {
            key: props.path,
            path: props.path,
            exact: props.exact,
         };

         return React.createElement(Route, routeProps, React.createElement(Page, pageProps));
      }

      createRoutes() {
         const Router = this.getComponent('routing.router');
         const Switch = this.getComponent('routing.switch');

         const Routes: React.FC<RoutesProps> = ({ routes = [] }) => {
            const rootElements = routes.map((route: RouteProps) => this.createRoute(route));
            return React.createElement(Router, {}, React.createElement(Switch, {}, rootElements));
         };
         return Routes;
      }
   }

   return Routing;
};

export type RoutingAspect = Mixin<typeof RoutingAspect>;
