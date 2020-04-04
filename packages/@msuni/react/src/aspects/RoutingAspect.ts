import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {AnyConstructor, Mixin} from "../../uni/Mixin";
import Context from "../../uni/Context";
import {IComponentsRegistryAspect} from "./ComponentsRegistryAspect";
import {IResourceManagementAspect} from "./ResourceManagementAspect";
import {ResourceTypes} from "../constants";
import {IReactContextProvidersAspect} from "./ReactContextProvidersAspect";
import {IPagesAndLayoutsAspect} from "./PagesAndLayoutsAspect";
import useApp from "../utils/useApp";

export interface IRoutingAspectAspect {
}

export interface IRouteProps {
    path: string,
    exact?: boolean,
    page: string,
    type?: string
}

export interface IRoutesProps {
    routes: IRouteProps[]
}

export const RoutingAspectMixin =
    <T extends AnyConstructor<
        Context &
        IResourceManagementAspect &
        IComponentsRegistryAspect &
        IReactContextProvidersAspect &
        IPagesAndLayoutsAspect
        >
    >(base : T) =>
    {
        class RoutingAspect extends base implements IRoutingAspectAspect {

            constructor(...args: any[]) {
                super(...args);

                this.useResourceType(ResourceTypes.routes);

                this.useComponent('routing.router', BrowserRouter);
                this.useComponent('routing.switch', Switch);
                this.useComponent('routing.link', Link);
                this.useComponent('routing.redirect', Redirect);
                this.useComponent(`routing.route`, Route);

                this.useComponent(`routing.routes`, this.createRoutes());
            }

            useRoute(route: IRouteProps) {
                return this.useResource(ResourceTypes.routes, route.path, route);
            }

            getRoutes() {
                return this.getResourcesByType(ResourceTypes.routes);
            }

            createRoute(props: IRouteProps) {
                const type = props.type;

                const pageProps = this.getPage(props.page);
                if (!pageProps)
                    throw new Error(`Route page ${props.page} is not registered`);

                const routeComponentKey = type ? `routing.${type}_route` : 'routing.route';
                const Route = this.getComponent(routeComponentKey);
                if (!Route)
                    throw new Error(`Component '${routeComponentKey}' for route type '${type}' is not registered`);

                const Page = this.getComponent('page');
                if (!Page)
                    throw new Error(`Page component is not registered`);

                const routeProps = {
                    key: props.path,
                    path: props.path,
                    exact: props.exact
                };

                return React.createElement(Route, routeProps, React.createElement(Page, pageProps));
            }

            createRoutes() {
                const Router = this.getComponent('routing.router');
                const Switch = this.getComponent('routing.switch');

                const Routes: React.FC<IRoutesProps> = ({routes = []}) => {
                    const { app } = useApp();
                    const routes1 = Array.from(app.getRoutes().values()) as IRouteProps[];
                    const rootElements = routes1.map((route: IRouteProps) => this.createRoute(route));
                    return React.createElement(Router, {}, React.createElement(Switch, {}, rootElements));
                };
                return Routes;
            }
        }

        return RoutingAspect
    };

export type RoutingAspectMixin = Mixin<typeof RoutingAspectMixin>;


