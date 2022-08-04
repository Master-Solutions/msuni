import React, { Component, ReactElement, ReactNode } from 'react';


type Schema = { [type: string]: ReactNode };

type Item = {
	type: string;
	name?: string;
	items?: Item[];
}

type CompoundComponentProps = {
	schema: Schema;
	item: Item;
};

export class CompoundComponent extends Component<CompoundComponentProps> {

	renderItem(item) {
		const Node = this.props.schema[item.type];
		if (!Node)
			return <span>Compound component node type {item.type} is unknown.</span>;

		return (
			<Node key={item.name}>
				{(item.items || []).map(this.renderItem.bind(this))}
			</Node>
		);
	}

	render() {
		return this.renderItem(this.props.item);
	}

}
