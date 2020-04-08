import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Test } from './Test';
import { Provider, RComponent, Application } from '../src';
import withProps from '../src/utils/withProps';

describe('Application', () => {
   let app;
   const id = 'test';

   beforeEach(() => {
      app = new Application();
   });

   afterEach(cleanup);

   it('can render registered component', () => {
      app.useComponent(id, Test);

      const { getByTestId } = render(
         <Provider value={{ app }}>
            <RComponent id={id} />
         </Provider>
      );
      expect(getByTestId('t')).toHaveTextContent('Test: default');
   });

   it('can render registered component with hoc', () => {
      app.useComponent(id, Test, [withProps({ name: 'Yo' })]);

      const { getByTestId } = render(
         <Provider value={{ app }}>
            <RComponent id={id} />
         </Provider>
      );
      expect(getByTestId('t')).toHaveTextContent('Test: Yo');
   });

   it('can render from root', () => {
      app.useComponent('main', Test);
      const Root = app.buildRoot();

      const { getByTestId } = render(Root);
      expect(getByTestId('t')).toHaveTextContent('Test: default');
   });

   it('can render a custom layout based on default', () => {
      app.useComponent('layouts.mine', 'layouts.default', [
         withProps({ header: 'Yo, header!', children: 'Yo, children!' }),
      ]);

      const Root = app.buildRoot('layouts.mine');

      const { getByTestId } = render(Root);
      expect(getByTestId('header')).toHaveTextContent('Yo, header!');
      expect(getByTestId('main')).toHaveTextContent('Yo, children!');
   });

   it('can render a page with default layout', () => {
      app.useComponent(id, Test);
      app.useComponent('test.main', id, [withProps({ name: 'Main' })]);
      app.useComponent('test.footer', id, [withProps({ name: 'Footer' })]);

      app.usePage({
         id: 'page1',
         name: 'My Page',
         widgets: ['test.main', { id: 'test.footer', region: 'footer' }],
      });

      const Page = app.buildPage('page1');
      const Root = app.buildRootWithElement(<Page />);

      const { getByTestId } = render(Root);
      // console.log(container.innerHTML);
      expect(getByTestId('header')).toHaveTextContent('My Page');
      expect(getByTestId('main')).toHaveTextContent('Test: Main');
      expect(getByTestId('footer')).toHaveTextContent('Test: Footer');
   });

   it('can render page with router', () => {
      app.useComponent(id, Test);
      app.useComponent('test.page', id, [withProps({ name: 'Page content' })]);

      app.usePage({
         id: 'page',
         name: 'My Page',
         widgets: ['test.page'],
      });

      app.useRoute({ path: '/', page: 'page' });

      const Root = app.buildRoot('routing.routes');

      const { getByTestId } = render(Root);
      // console.log(container.innerHTML);
      expect(getByTestId('header')).toHaveTextContent('My Page');
      expect(getByTestId('main')).toHaveTextContent('Test: Page content');
   });
});
