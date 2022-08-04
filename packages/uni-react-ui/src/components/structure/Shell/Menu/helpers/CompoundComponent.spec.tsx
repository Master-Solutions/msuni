import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CompoundComponent } from './CompoundComponent';


const schema = {
	root: (props) => <div>{props.children}</div>,
	item: (props) => <span>{props.name}</span>
};

const item = {
	type: 'root',
	name: 'root',
	items: [
		{
			type: 'item',
			name: 'item1'
		}
	]
};


test('Renders', async () => {
	const { container } = render(<CompoundComponent schema={schema} item={item}>Just a box</CompoundComponent>);
	expect(container.innerHTML).toBe('<div><span>item1</span></div>');
});
