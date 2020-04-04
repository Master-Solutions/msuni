import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Box from './Box';

test('Renders', async () => {
    const {getByRole} = render(<Box color="tomato">Just a box</Box>);
    // expect(getByRole('flexbox')).toHaveTextContent('My First Component');
});