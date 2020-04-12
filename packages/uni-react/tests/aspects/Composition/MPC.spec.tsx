import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MPC } from '../../../src/aspects/Composition/MPC';

describe('MPC', () => {
   afterEach(cleanup);

   it('can render MPC component with default layout', () => {
      const { container } = render(
         <MPC>
            <MPC.Part id="test1">Test 1</MPC.Part>
            <MPC.Part id="test2">Test 2</MPC.Part>
         </MPC>
      );
      expect(container.innerHTML).toBe('<div>Test 1Test 2</div>');
   });

   it('can render MPC component with custom layout', () => {
      const Layout = (props) => {
         return (
            <div>
               <div>{props.header}</div>
               <div>{props.children}</div>
            </div>
         );
      };

      const layoutPropsMap = {
         header: ['test1'],
         // test2 comes in children by default
      };

      const { container } = render(
         <MPC layout={Layout} layoutPropsMap={layoutPropsMap}>
            <MPC.Part id="test1">Header</MPC.Part>
            <MPC.Part id="test2">Main</MPC.Part>
         </MPC>
      );
      expect(container.innerHTML).toBe('<div><div>Header</div><div>Main</div></div>');
   });
});
