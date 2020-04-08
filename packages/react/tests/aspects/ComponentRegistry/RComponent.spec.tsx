import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Test } from '../../Test';
import { Context, Provider, RComponent } from '../../../src';
import withProps from '../../../src/utils/withProps';
import { ComponentsRegistryAspect } from '../../../src/aspects/ComponentRegistry/ComponentsRegistryAspect';
import { ResourceManagementAspect } from '../../../src/aspects/ResourceManagement/ResourceManagementAspect';

describe('RComponent', () => {
   class App extends ComponentsRegistryAspect(ResourceManagementAspect(Context)) {}

   let app;
   const id = 'test';

   beforeEach(() => {
      app = new App();
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
});
