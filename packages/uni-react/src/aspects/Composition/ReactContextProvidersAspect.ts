import React, { FC, ComponentType } from 'react';
import ResourceInfo from '../ResourceManagement/ResourceInfo';
import { Mixin, AnyConstructor } from '../../types';
import { ComponentsRegistryAspect } from '../ComponentRegistry/ComponentsRegistryAspect';
import { ResourceManagementAspect } from '../ResourceManagement/ResourceManagementAspect';
import { Context } from '../../Context';
import { ResourceTypes } from '../../constants';
import { Provider as AppProvider } from '../../appCtx';

const APP_CONTEXT_KEY = 'app';

export const ReactContextProvidersAspect = <
	T extends AnyConstructor<Context & ResourceManagementAspect & ComponentsRegistryAspect>
>(
	base: T
) => {
	class ReactContextProviders extends base {
		constructor(...args: any[]) {
			super(...args);

			this.useProvider(APP_CONTEXT_KEY, AppProvider, () => ({ value: this }));
		}

		useProvider(id: string, provider: ComponentType, mapProps = undefined) {
			return this.rm.add(new ResourceInfo(id, ResourceTypes.providers, provider, { mapProps }));
		}

		getProvider(id: string) {
			return this.rm.findByTypeAndId(ResourceTypes.providers, id);
		}

		getProviders() {
			return this.rm.findByType(ResourceTypes.providers);
		}

		async buildRootWithComponent(Component: ComponentType): Promise<ComponentType> {
			// if (!React.isValidElement(el)) throw new Error(`${el} is not a valid element`);
			const ris = this.getProviders().reverse();

			const Root: React.FC<{}> = ({ children }) => {
				let Wrapper = React.createElement(Component, {}, children);
				ris.forEach((ri) => {
					const props = typeof ri.options.mapProps === 'function' ? ri.options.mapProps() : ri.options.mapProps;
					Wrapper = React.createElement(ri.value, props, Wrapper);
				});
				return Wrapper;
			};

			return Root;
		}

		// id of a component
		async buildRoot(main = 'main'): Promise<ComponentType> {
			const Main = this.getComponent(main);
			return await this.buildRootWithComponent(Main);
		}
	}

	return ReactContextProviders;
};

export type ReactContextProvidersAspect = Mixin<typeof ReactContextProvidersAspect>;
