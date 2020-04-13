import { Mixin, AnyConstructor } from '../../types';
import ResourceInfo from '../ResourceManagement/ResourceInfo';
import { ResourceManagementAspect } from '../ResourceManagement/ResourceManagementAspect';
import { ComponentsRegistryAspect } from '../ComponentRegistry/ComponentsRegistryAspect';
import { CompositeComponentProps, CompositionAspect } from './CompositionAspect';
import { Context } from '../../Context';
import { ResourceTypes } from '../../constants';

import { PageTitle } from './PageTitle';

export interface PageProps extends CompositeComponentProps {
	name: string;
}

export interface PagesAspectOptions {
	pagesNs?: string;
}

export const PagesAspect = <
	T extends AnyConstructor<Context & ResourceManagementAspect & ComponentsRegistryAspect & CompositionAspect>
>(
	base: T,
	options: PagesAspectOptions = { pagesNs: 'pages' }
) => {
	class Pages extends base {
		constructor(...args: any[]) {
			super(...args);

			this.useComponent('pageTitle', PageTitle);
		}

		usePage(id: string, page: PageProps) {
			const pageRi = new ResourceInfo(id, ResourceTypes.pages, page);
			this.rm.add(pageRi);

			const cc = Object.assign({}, page);
			cc.parts = [].concat([{ id: 'pageTitle', props: { name: page.name } }], cc.parts);
			if (!cc.layoutPropsMap) cc.layoutPropsMap = {};
			cc.layoutPropsMap['header'] = [].concat(['pageTitle'], (cc.layoutPropsMap as any).header || []);

			const ccId = `${options.pagesNs}.${id}`;
			this.useCompositeComponent(ccId, cc);

			return pageRi;
		}

		getPage(id: string) {
			const ri = this.rm.findByTypeAndId(ResourceTypes.pages, id);
			if (!ri) throw new Error(`Page '${id}' is not registered.`);
			return ri.value;
		}

		getPageComponent(id: string) {
			const cId = `${options.pagesNs}.${id}`;
			return this.getComponent(cId);
		}

		getPages() {
			return this.rm.findByType(ResourceTypes.pages);
		}
	}

	return Pages;
};

export type PagesAspect = Mixin<typeof PagesAspect>;
