import { Context } from './Context';
import { ReactContextProvidersAspect } from './aspects/Composition/ReactContextProvidersAspect';
import { RoutingAspect } from './aspects/Routing/RoutingAspect';
import { ComponentsRegistryAspect } from './aspects/ComponentRegistry/ComponentsRegistryAspect';
import { ResourceManagementAspect } from './aspects/ResourceManagement/ResourceManagementAspect';
import { LayoutsAspect } from './aspects/Composition/LayoutsAspect';
import { PagesAspect } from './aspects/Composition/PagesAspect';
import { StateManagementAspect } from './aspects/StateManagement/StateManagementAspect';
import { DefaultLayout } from './aspects/Composition/DefaultLayout';
import { ComponentNamespaces } from './constants';
import { EmptyLayout } from './components/EmptyLayout';
import { CompositionAspect } from './aspects/Composition/CompositionAspect';

export class Application extends StateManagementAspect(
	RoutingAspect(
		PagesAspect(
			LayoutsAspect(
				ReactContextProvidersAspect(
					CompositionAspect(ComponentsRegistryAspect(ResourceManagementAspect(Context)), {
						layoutsNs: ComponentNamespaces.layouts,
					})
				)
			),
			{ pagesNs: ComponentNamespaces.pages }
		)
	)
) {
	constructor() {
		super();

		// minimal resources preset
		// this.useFeature(MinimalResourcesPreset)

		this.useComponent(`${ComponentNamespaces.layouts}.empty`, EmptyLayout);
		this.useComponent(`${ComponentNamespaces.layouts}.default`, DefaultLayout);
	}
}

// I would prefer the following mixin syntax but TS intellisense not working with it
// class Application extends mix(Context).with(
//     ResourceManagementAspect,
//     ComponentsRegistryAspect
//     ...
// ) {
//
// }
