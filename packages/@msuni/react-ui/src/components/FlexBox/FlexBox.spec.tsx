import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FlexBox from './FlexBox';

test('Renders', async () => {
    const {getByRole} = render(<FlexBox border="2px solid blue"></FlexBox>);
    //expect(getByRole('flexbox')).toHaveTextContent('My First Component');
});