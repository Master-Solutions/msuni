import {Mixin, AnyConstructor} from "../../types";
import {IResourceManager, ResourceManager} from "./ResourceManager";

export interface IResourceManagementAspect {
    rm: IResourceManager;
}

export const ResourceManagementAspectMixin =
    <T extends AnyConstructor<object>>(base : T) =>
    {
        class ResourceManagementAspect extends base implements IResourceManagementAspect {
            readonly rm: IResourceManager;

            constructor(...args: any[]) {
                super(...args);

                this.rm = new ResourceManager()
            }
        }

        return ResourceManagementAspect
    };

export type ResourceManagementAspectMixin = Mixin<typeof ResourceManagementAspectMixin>;

