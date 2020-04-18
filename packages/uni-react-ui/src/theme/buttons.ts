import base from './base';

export default {
	buttons: {
		primary: {
			color: 'background',
			bg: 'primary',
			'&:hover': {
				bg: 'text',
			},
		},
		secondary: {
			color: 'background',
			bg: 'secondary',
		},
	},
	buttonSizes: {
		medium: {
			fontSize: base.fontSizes[2],
			padding: `8px 16px`,
		},
		large: {
			fontSize: base.fontSizes[4],
			padding: `16px 32px`,
		},
	},
};
