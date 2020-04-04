import {IResourceManager, default as ResourceManager} from "../ResourceManager";
import {AnyConstructor, Mixin} from "../types";


export const ResourceManagementAspectMixin =
    <T extends AnyConstructor<object>>(base : T) =>
    {
        class ResourceManagementAspect extends base {
            readonly resources: IResourceManager;

            constructor(...args: any[]) {
                super(...args);

                this.resources = new ResourceManager()
            }
        }

        return ResourceManagementAspect
    };

export type ResourceManagementAspectMixin = Mixin<typeof ResourceManagementAspectMixin>;

