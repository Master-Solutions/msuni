import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {AnyConstructor, Mixin} from "../../types";
import {IReactContextProvidersAspect} from "../Composition/ReactContextProvidersAspect";
import ResourceInfo from "../ResourceManagement/ResourceInfo";
import withAppRoutes from "../../utils/withAppRoutes";
import {Context, IComponentsRegistryAspect, IResourceManagementAspect, ResourceTypes} from "../../../src";
import {IPagesAspect} from "../Composition/PagesAspect";


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
        IPagesAspect
        >
    >(base : T) =>
    {
        class RoutingAspect extends base implements IRoutingAspectAspect {

            constructor(...args: any[]) {
                super(...args);

                this.useComponent('routing.router', BrowserRouter);
                this.useComponent('routing.switch', Switch);
                this.useComponent('routing.link', Link);
                this.useComponent('routing.redirect', Redirect);
                this.useComponent(`routing.route`, Route);

                this.useComponent(`routing.routes`, this.createRoutes(), [withAppRoutes]);
            }

            useRoute(route: IRouteProps) {
                return this.rm.add(new ResourceInfo(route.path, ResourceTypes.routes, route));
            }

            getRoutes() {
                return this.rm.findByType(ResourceTypes.routes).map(ri => ri.value);
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
                    const rootElements = routes.map((route: IRouteProps) => this.createRoute(route));
                    return React.createElement(Router, {}, React.createElement(Switch, {}, rootElements));
                };
                return Routes;
            }
        }

        return RoutingAspect
    };

export type RoutingAspectMixin = Mixin<typeof RoutingAspectMixin>;


