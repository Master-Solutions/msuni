import {Mixin, AnyConstructor} from "../../types";
import DefaultLayout from "./DefaultLayout";
import ResourceInfo from "../ResourceManagement/ResourceInfo";
import {Context, IComponentsRegistryAspect, IResourceManagementAspect, ResourceTypes} from "../../../src";

export interface ILayoutsAspect {
    useLayout(page: ILayoutProps): ResourceInfo
    getLayout(id: string): ILayoutProps
}

export interface ILayoutProps {
    id: string,
    component: string,
    widgets: string[]
}

const DEFAULT_LAYOUT_KEY = 'default';
const COMPONENT_DEFAULT_LAYOUT_KEY = `layouts.${DEFAULT_LAYOUT_KEY}`;

export const LayoutsAspectMixin =
    <T extends AnyConstructor<Context & IResourceManagementAspect & IComponentsRegistryAspect>>(base : T) =>
    {
        class LayoutsAspect extends base implements ILayoutsAspect {

            constructor(...args: any[]) {
                super(...args);

                this.useComponent(COMPONENT_DEFAULT_LAYOUT_KEY, DefaultLayout);
            }

            useLayout(layout: ILayoutProps) {
                return this.rm.add(new ResourceInfo(layout.id, ResourceTypes.layouts, layout));
            }

            getLayout(id: string) {
                return this.rm.findByTypeAndId(ResourceTypes.layouts, id).value;
            }

        }

        return LayoutsAspect
    };

export type LayoutsAspectMixin = Mixin<typeof LayoutsAspectMixin>;


