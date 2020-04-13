import { Mixin, AnyConstructor } from '../../types';
import ResourceInfo from '../ResourceManagement/ResourceInfo';
import { ComponentsRegistryAspect } from '../ComponentRegistry/ComponentsRegistryAspect';
import { ResourceManagementAspect } from '../ResourceManagement/ResourceManagementAspect';
import { Context } from '../../Context';
import { ComponentNamespaces, ResourceTypes } from '../../constants';
import { CompositeComponentProps, CompositionAspect } from './CompositionAspect';

export interface LayoutProps extends CompositeComponentProps {}

export const LayoutsAspect = <
	T extends AnyConstructor<Context & ResourceManagementAspect & ComponentsRegistryAspect & CompositionAspect>
>(
	base: T
) => {
	class Layouts extends base {
		useLayout(id: string, layout: LayoutProps) {
			const layoutRi = new ResourceInfo(id, ResourceTypes.layouts, layout);
			this.rm.add(layoutRi);

			const cc = Object.assign({}, layout);

			const ccId = `${ComponentNamespaces.layouts}.${id}`;
			this.useCompositeComponent(ccId, cc);

			return layoutRi;
		}

		getLayout(id: string) {
			const ri = this.rm.findByTypeAndId(ResourceTypes.layouts, id);
			if (!ri) throw new Error(`Layout '${id}' is not registered.`);
			return ri.value;
		}

		getLayouts() {
			return this.rm.findByType(ResourceTypes.layouts);
		}
	}

	return Layouts;
};

export type LayoutsAspect = Mixin<typeof LayoutsAspect>;
