import React from 'react';
import { Mixin, AnyConstructor } from '../../types';
import ResourceInfo from '../ResourceManagement/ResourceInfo';
import { ResourceManagementAspect } from '../ResourceManagement/ResourceManagementAspect';
import { ComponentsRegistryAspect } from '../ComponentRegistry/ComponentsRegistryAspect';
import { Context } from '../../Context';
import { ResourceTypes } from '../../constants';
import { CC } from '../../components/CC';

export interface Part {
	id: string;
	componentId?: string;
	props?: object;
}

export interface CompositeComponentProps {
	parts: (string | Part)[];
	layout: string;
	layoutPropsMap?: { [key: string]: string[] };
}

export interface CompositionAspectOptions {
	layoutsNs?: string;
}

export const CompositionAspect = <
	T extends AnyConstructor<Context & ResourceManagementAspect & ComponentsRegistryAspect>
>(
	base: T,
	options: CompositionAspectOptions = { layoutsNs: 'layouts' }
) => {
	class Composition extends base {
		useCompositeComponent(id: string, cc: CompositeComponentProps) {
			const ccRi = this.rm.add(new ResourceInfo(id, ResourceTypes.compositeComponents, cc));
			this.useComponent(id, this.buildCompositeComponent(cc));
			return ccRi;
		}

		getCompositeComponent(id: string) {
			const ri = this.rm.findByTypeAndId(ResourceTypes.compositeComponents, id);
			if (!ri) throw new Error(`Composite component '${id}' is not registered.`);
			return ri.value;
		}

		getCompositeComponents() {
			return this.rm.findByType(ResourceTypes.compositeComponents);
		}

		buildCompositeComponent(cc: CompositeComponentProps) {
			const layout = this.getComponent(`${options.layoutsNs}.${cc.layout}`);
			const layoutPropsMap = cc.layoutPropsMap;
			const ccProps = { layout, layoutPropsMap };

			return (props) => {
				const parts = cc.parts.map((p) => {
					const id = typeof p === 'string' ? p : p.id;
					const componentId = typeof p === 'string' ? p : p.componentId || p.id;
					const Component = this.getComponent(componentId);
					const props = typeof p === 'string' ? {} : p.props;
					return React.createElement(CC.Part, { id, key: id }, React.createElement(Component, props));
				});
				return React.createElement(CC, ccProps, parts);
			};
		}
	}

	return Composition;
};

export type CompositionAspect = Mixin<typeof CompositionAspect>;
