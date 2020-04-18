import { Mixin, AnyConstructor } from '../../types';
import { ResourceManager } from './ResourceManager';

export const ResourceManagementAspect = <T extends AnyConstructor<object>>(base: T) => {
	class ResourceManagement extends base {
		readonly rm: ResourceManager;

		constructor(...args: any[]) {
			super(...args);

			this.rm = new ResourceManager();
		}
	}

	return ResourceManagement;
};

export type ResourceManagementAspect = Mixin<typeof ResourceManagementAspect>;
