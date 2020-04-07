import React from "react";
import {Mixin, AnyConstructor} from "../../types";
import ResourceInfo from "../ResourceManagement/ResourceInfo";
import {compose} from "recompose";
import {Context, IResourceManagementAspect, ResourceTypes} from "../../../src";

export interface IComponentsRegistryAspect {
    useComponent(id: string, idOrComponent: string | React.ReactNode, hocs?: any[]): ResourceInfo
    getComponent(id: string): any
}

export const ComponentsRegistryAspectMixin =
    <T extends AnyConstructor<Context & IResourceManagementAspect>>(base : T) =>
    {
        class ComponentsRegistryAspect extends base implements IComponentsRegistryAspect {

            constructor(...args: any[]) {
                super(...args);
            }

            useComponent(id: string, idOrComponent: string | React.ReactNode, hocs: any[] = []) {
                const ri = new ResourceInfo(id, ResourceTypes.components, idOrComponent, {hocs});
                return this.rm.add(ri);
            }

            getComponent(id: string) {
                const ri = this.rm.findByTypeAndId(ResourceTypes.components, id);
                if (!ri)
                    throw new Error(`Component '${id}' is not registered.`);

                let Component = ri.value;
                if (typeof Component === 'string')
                    Component = this.getComponent(Component);

                return compose(...ri.options.hocs)(Component);
            }
        }

        return ComponentsRegistryAspect
    };

export type ComponentsRegistryAspectMixin = Mixin<typeof ComponentsRegistryAspectMixin>;

