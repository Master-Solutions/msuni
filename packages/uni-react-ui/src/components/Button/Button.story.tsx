import React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from './Button';
import theme from '../../theme';
import { Box } from '../Box/Box';

storiesOf('Button', module)
	.add('Default', () => <Button theme={theme}>Hello</Button>)
	.add('Variants', () => (
		<Box>
			<Button theme={theme} variant="primary" size="medium" mr={2}>
				Primary Medium
			</Button>
			<Button theme={theme} variant="secondary" size="large">
				Secondary Large
			</Button>
		</Box>
	));
