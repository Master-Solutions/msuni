import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Test } from './Test';
import { Application, bootstrap } from '../src';

describe('Application', () => {
	let app;
	const id = 'test';

	beforeEach(() => {
		app = new Application();
	});

	afterEach(cleanup);

	describe('components', () => {
		it('can bootstrap with custom main', async () => {
			app.useComponent('main', Test);

			const Root = await bootstrap(app, { mainComponent: 'main' });
			const { getByTestId } = render(<Root />);

			expect(getByTestId('t')).toHaveTextContent('Test: default');
		});
	});

	describe('composition', () => {
		it('can render a composite layout', async () => {
			app.useComponent(id, Test);
			app.useLayout('cc', {
				parts: [
					{ id: 'w1', componentId: id, props: { name: 'w1' } },
					{ id: 'w2', componentId: id, props: { name: 'w2' } },
				],
				layout: 'default',
				layoutPropsMap: {
					header: ['w1'],
				},
			});

			const Root = await bootstrap(app, { mainComponent: 'layouts.cc' });
			const { getByRole } = render(<Root />);

			expect(getByRole('header')).toHaveTextContent('Test: w1');
			expect(getByRole('main')).toHaveTextContent('Test: w2');
		});
	});

	describe('pages', () => {
		it('can render a page with default layout', async () => {
			app.useComponent(id, Test);

			app.usePage('page1', {
				name: 'My Page',
				parts: [
					{ id: 'test.main', componentId: id, props: { name: 'Main' } },
					{ id: 'test.footer', componentId: id, props: { name: 'Footer' } },
				],
				layout: 'default',
				layoutPropsMap: {
					footer: ['test.footer'],
				},
			});

			const Root = await bootstrap(app, { mainComponent: 'pages.page1' });

			const { getByRole } = render(<Root />);
			expect(getByRole('header')).toHaveTextContent('My Page');
			expect(getByRole('main')).toHaveTextContent('Test: Main');
			expect(getByRole('footer')).toHaveTextContent('Test: Footer');
		});

		it('can render page with two same widgets', async () => {
			app.useComponent(id, Test);

			app.usePage('p1', {
				name: 'My Page',
				parts: [
					{ id: `${id}_1`, componentId: id },
					{ id: `${id}_2`, componentId: id },
				],
				layout: 'default',
			});

			const Root = await bootstrap(app, { mainComponent: 'pages.p1' });
			const { getByRole } = render(<Root />);

			expect(getByRole('header')).toHaveTextContent('My Page');
			expect(getByRole('main')).toHaveTextContent('Test: defaultTest: default');
		});
	});

	describe('with routing', () => {
		it('can render default route page', async () => {
			app.useComponent(id, Test);

			app.usePage('page', {
				name: 'My Page',
				parts: [{ id: id, props: { name: 'Page content' } }],
				layout: 'default',
			});

			app.useRoute({ path: '/', page: 'page' });

			const Root = await bootstrap(app);

			const { getByRole } = render(<Root />);
			expect(getByRole('header')).toHaveTextContent('My Page');
			expect(getByRole('main')).toHaveTextContent('Test: Page content');
		});
	});
});
