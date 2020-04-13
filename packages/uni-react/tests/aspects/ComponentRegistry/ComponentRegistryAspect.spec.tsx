import '@testing-library/jest-dom/extend-expect';
import { Test } from '../../Test';
import withProps from '../../../src/utils/withProps';
import { ResourceManagementAspect } from '../../../src/aspects/ResourceManagement/ResourceManagementAspect';
import { ComponentsRegistryAspect } from '../../../src/aspects/ComponentRegistry/ComponentsRegistryAspect';
import { Context } from '../../../src/Context';
import { ResourceTypes } from '../../../src/constants';

describe('ComponentRegistryAspect', () => {
	class App extends ComponentsRegistryAspect(ResourceManagementAspect(Context)) {}

	let app;
	const id = 'test';

	beforeEach(() => {
		app = new App();
	});

	describe('#useComponent', () => {
		it('can register a component', () => {
			const ri = app.useComponent(id, Test);

			expect(ri.id).toBe(id);
			expect(ri.type).toBe(ResourceTypes.components);
			expect(ri.value).toBe(Test);
			expect(ri.options.hocs.length).toBe(0);
		});

		it('can register a component with hoc', () => {
			const ri = app.useComponent(id, Test, [withProps({ name: 'Yo' })]);
			expect(ri.options.hocs.length).toBe(1);
		});

		it('can register dependent component', () => {
			app.useComponent(id, Test);
			const ri = app.useComponent('namedTest', id, [withProps({ name: 'Yo' })]);
			expect(ri.value).toBe(id);
		});
	});

	describe('#getComponent', () => {
		it('can get registered component', () => {
			app.useComponent(id, Test);
			expect(app.getComponent(id)).toBe(Test);
		});

		it('can get registered component with hoc', () => {
			app.useComponent(id, Test, [withProps({ name: 'test' })]);
			expect(app.getComponent(id)).not.toBe(Test);
		});

		it('throws if not registered', () => {
			expect(() => app.getComponent(id)).toThrow(`Component '${id}' is not registered.`);
		});
	});
});
