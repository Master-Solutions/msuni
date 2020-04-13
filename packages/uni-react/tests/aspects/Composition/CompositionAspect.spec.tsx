import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { ResourceManagementAspect } from '../../../src/aspects/ResourceManagement/ResourceManagementAspect';
import { ComponentsRegistryAspect } from '../../../src/aspects/ComponentRegistry/ComponentsRegistryAspect';
import { Context } from '../../../src/Context';
import { ComponentNamespaces } from '../../../src/constants';
import { CompositionAspect } from '../../../src/aspects/Composition/CompositionAspect';
import { DefaultLayout } from '../../../src/aspects/Composition/DefaultLayout';

describe('CompositionAspect', () => {
	class App extends CompositionAspect(ComponentsRegistryAspect(ResourceManagementAspect(Context))) {}

	let app;
	const id = 'test';

	const T1 = () => React.createElement('div', {}, 't1');
	const T2 = () => React.createElement('div', {}, 't2');

	beforeEach(() => {
		app = new App();
		app.useComponent(`${ComponentNamespaces.layouts}.default`, DefaultLayout);

		app.useComponent('t1', T1);
		app.useComponent('t2', T2);
	});

	describe('#useCompositeComponent', () => {
		it('can register a component', () => {
			const cc = {
				parts: ['t1', 't2'],
				layout: 'default',
			};
			const ri = app.useCompositeComponent(id, cc);
			expect(ri.value).toBe(cc);
		});

		it('registration creates common component too', () => {
			app.useCompositeComponent(id, { parts: ['t1'], layout: 'default' });
			expect(app.getComponent(id)).toBeDefined();
		});
	});

	describe('#getCompositeComponent', () => {
		it('can get registered component', () => {
			const cc = {
				parts: ['t1', 't2'],
				layout: 'default',
			};
			app.useCompositeComponent(id, cc);
			expect(app.getCompositeComponent(id)).toBe(cc);
		});

		it('throws if not registered', () => {
			expect(() => app.getCompositeComponent(id)).toThrow(`Composite component '${id}' is not registered.`);
		});
	});
});
