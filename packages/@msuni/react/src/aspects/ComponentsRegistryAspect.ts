import {IResourceManagementAspect} from "./ResourceManagementAspect";
import {ResourceTypes} from "../constants";
import {AnyConstructor, Mixin} from "../../uni/Mixin";
import Context from "../../uni/Context";

export interface IComponentsRegistryAspect {
    useComponent(key: string, r: any): void
    getComponent(key: string): any
}

export const ComponentsRegistryAspectMixin =
    <T extends AnyConstructor<Context & IResourceManagementAspect>>(base : T) =>
    {
        class ComponentsRegistryAspect extends base implements IComponentsRegistryAspect {

            constructor(...args: any[]) {
                super(...args);

                this.useResourceType(ResourceTypes.components);
            }

            useComponent(key: string, r: any) {
                return this.useResource(ResourceTypes.components, key, r);
            }

            getComponent(key: string) {
                return this.getResource(ResourceTypes.components, key);
            }
        }

        return ComponentsRegistryAspect
    };

export type ComponentsRegistryAspectMixin = Mixin<typeof ComponentsRegistryAspectMixin>;

