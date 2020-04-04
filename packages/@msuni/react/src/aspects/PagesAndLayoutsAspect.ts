import {AnyConstructor, Mixin} from "../../uni/Mixin";
import Context from "../../uni/Context";
import {IComponentsRegistryAspect} from "./ComponentsRegistryAspect";
import {IResourceManagementAspect} from "./ResourceManagementAspect";
import {ResourceTypes} from "../constants";
import Page from "../components/Page";
import Layout from "../components/Layout";

export interface IPagesAndLayoutsAspect {
    usePage(page: IPageProps): void
    getPage(key: string): IPageProps
    getPages(): Map<string, IPageProps>
}

export interface IPageProps {
    id: string,
    name: string,
    layout?: string,
    widgets: string[]
}

const DEFAULT_LAYOUT_KEY = 'default';
const COMPONENT_DEFAULT_LAYOUT_KEY = `layouts.${DEFAULT_LAYOUT_KEY}`;

export const PagesAndLayoutsAspectMixin =
    <T extends AnyConstructor<Context & IResourceManagementAspect & IComponentsRegistryAspect>>(base : T) =>
    {
        class PagesAndLayoutsAspect extends base implements IPagesAndLayoutsAspect {

            constructor(...args: any[]) {
                super(...args);

                this.useResourceType(ResourceTypes.pages);
                this.useResourceType(ResourceTypes.layouts);

                this.useComponent('page', Page);
                this.useComponent(COMPONENT_DEFAULT_LAYOUT_KEY, Layout);
            }

            usePage(page: IPageProps) {
                return this.useResource(ResourceTypes.pages, page.id, page);
            }

            getPage(key: string) {
                return this.getResource(ResourceTypes.pages, key);
            }

            getPages() {
                return this.getResourcesByType(ResourceTypes.pages);
            }
        }

        return PagesAndLayoutsAspect
    };

export type PagesAndLayoutsAspectMixin = Mixin<typeof PagesAndLayoutsAspectMixin>;


