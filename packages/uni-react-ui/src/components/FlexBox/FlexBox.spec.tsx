import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FlexBox } from './FlexBox';

test('Renders', async () => {
   const { container } = render(<FlexBox border="2px solid blue">Test</FlexBox>);
   expect(container).toHaveTextContent('Test');
});
