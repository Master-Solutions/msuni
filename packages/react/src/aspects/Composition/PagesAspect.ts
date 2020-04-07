import React from "react";
import {Mixin, AnyConstructor} from "../../types";
import Page from "./Page";
import ResourceInfo from "../ResourceManagement/ResourceInfo";
import {Context, IComponentsRegistryAspect, IResourceManagementAspect, ResourceTypes} from "../../../src";
import withProps from "../../utils/withProps";


export interface IPagesAspect {
    usePage(page: IPageProps): ResourceInfo
    getPage(id: string): IPageProps
    getPages(): ResourceInfo[]
    buildPage(id: string): React.ReactNode
}

export type Widget = {
    id: string
    region?: string
}

export interface IPageProps {
    id: string,
    name: string,
    layout?: string,
    widgets: (string | Widget)[]
}

export const PagesAspectMixin =
    <T extends AnyConstructor<Context & IResourceManagementAspect & IComponentsRegistryAspect>>(base : T) =>
    {
        class PagesAspect extends base implements IPagesAspect {

            constructor(...args: any[]) {
                super(...args);

                this.useComponent('page', Page);
            }

            usePage(page: IPageProps) {
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

        return PagesAspect
    };

export type PagesAspectMixin = Mixin<typeof PagesAspectMixin>;


