import React from 'react';
import { Mixin, AnyConstructor } from '../../types';
import ResourceInfo from '../ResourceManagement/ResourceInfo';
import { ResourceManagementAspect } from '../ResourceManagement/ResourceManagementAspect';
import { compose } from '../../utils/compose';
import { Context } from '../../Context';
import { ResourceTypes } from '../../constants';

export const ComponentsRegistryAspect = <T extends AnyConstructor<Context & ResourceManagementAspect>>(base: T) => {
	class ComponentsRegistry extends base {
		useComponent(id: string, idOrComponent: string | React.ReactNode, hocs: Function[] = []) {
			const ri = new ResourceInfo(id, ResourceTypes.components, idOrComponent, { hocs });
			return this.rm.add(ri);
		}

		getComponent(id: string, hocs: Function[] = []) {
			const ri = this.rm.findByTypeAndId(ResourceTypes.components, id);
			if (!ri) throw new Error(`Component '${id}' is not registered.`);

			let Component = ri.value;
			if (typeof Component === 'string') Component = this.getComponent(Component);

			const cHocs = [].concat(ri.options.hocs, hocs);

			return compose(...cHocs)(Component);
		}
	}

	return ComponentsRegistry;
};

export type ComponentsRegistryAspect = Mixin<typeof ComponentsRegistryAspect>;
