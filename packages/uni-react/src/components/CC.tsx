import React, { Fragment, FC, ReactElement, ComponentType } from 'react';
import { EmptyLayout } from './EmptyLayout';

export interface PartProps {
	id: string;
}

export const Part: FC<PartProps> = (props) => {
	return <Fragment>{props.children}</Fragment>;
};

export type PartElement = ReactElement<PartProps>;

export interface CCProps {
	layout?: ComponentType;
	layoutPropsMap?: object;
	children?: PartElement | Array<PartElement>;
}

export class CC extends React.Component<CCProps> {
	static Part = Part;

	render() {
		const Layout = this.props.layout || EmptyLayout;
		const layoutPropsMap = this.props.layoutPropsMap || {};
		const parts = React.Children.toArray(this.props.children);

		const partsMap = {};
		parts.forEach((p: PartElement) => {
			if (p.props.id in partsMap) throw new Error(`CC part '${p.props.id}' is not unique.`);
			partsMap[p.props.id] = p;
		});

		const layoutProps = {};
		const referencedParts = {};

		// 1. layoutPropsMap is a map: region => array of parts
		// 2. not referenced parts should go into children
		Object.keys(layoutPropsMap).forEach((region) => {
			layoutProps[region] = (layoutPropsMap[region] || []).map((id) => {
				const p = partsMap[id];
				if (!(id in referencedParts)) referencedParts[id] = true;
				return p;
			});
		});

		if (!('children' in layoutProps)) layoutProps['children'] = [];

		layoutProps['children'] = [].concat(
			layoutProps['children'],
			parts.filter((p: PartElement) => !referencedParts[p.props.id])
		);

		return <Layout {...layoutProps} />;
	}
}
