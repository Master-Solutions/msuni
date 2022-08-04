/** @jsx jsx */
import React, { AnchorHTMLAttributes, FC, ReactElement, ReactNode, ReactType, useState } from 'react';
import { addDecorator, storiesOf } from '@storybook/react';

import { ThemeProvider } from 'emotion-theming';
import { Router, Route, useLocation } from 'react-router';
import { createMemoryHistory } from 'history';
import { Link, LinkProps } from 'react-router-dom';
import { css, Global, jsx } from '@emotion/core';
import { ActiveAware, MenuItemBox } from './helpers/MenuItemBox';
import { MenuItemsBox } from './helpers/MenuItemsBox';
import tailwindPreflight from './helpers/tailwindPreflight';
import { Expander } from './helpers/Expander';

const theme = {
	fonts: {
		body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
		mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
	}
};

const CssReset = () => <Global styles={theme => tailwindPreflight(theme)}/>;

addDecorator(story => <ThemeProvider theme={theme}><CssReset />{story()}</ThemeProvider>);


const Shell = (props) => {
	return <div style={{display: 'grid', gridTemplateColumns: '200px auto', gridColumnGap: "5px", padding: "5px", border: 'solid 1px black'}}>{props.children}</div>
};
const Sidebar = (props) => <div style={{width: '200px'}}>{props.children}</div>;

const Page = ({name}) => <div style={{height: '100%', border: "solid 1px", paddingLeft: '5px'}}><h1>{name}</h1></div>;

const Page1 = () => <Page name="Page 1"/>;
const Page2 = () => <Page name="Page 2"/>;
const Page3 = () => <Page name="Page 3"/>;

const history = createMemoryHistory({ initialEntries: ['/page1'] });

const baseStyles = css`
	background-color: #dddddd;
	height: 40px;
	justify-content: center;		
	text-transform: uppercase;
	border: solid 1px black;
	&:hover {
		background-color: red;
	}
	& > a {
		display: flex;
		align-items: center;
		justify-content: center;	
		width: 100%;
		height: 100%;		
	}
`;

const activeStyles = css`	
	background-color: yellow;
	&:hover {
		background-color: yellow;
	}
`;


const MenuItem: React.FC<ActiveAware> = ({active, children}) =>
	<MenuItemBox active={active} baseCss={baseStyles} activeCss={activeStyles}>{children}</MenuItemBox>;


type LinkMenuItemProps = LinkProps & ActiveAware;
const LinkMenuItem: FC<LinkMenuItemProps> = ({active, ...rest}) => {
	return <MenuItem active={active}><Link {...rest} /></MenuItem>;
};

const LocationAwareLinkMenuItem: FC<LinkProps> = (props) => {
	const location = useLocation();
	const active = props.to == location.pathname;
	return <LinkMenuItem active={active} {...props} />;
};

type ExternalLinkMenuItemProps = AnchorHTMLAttributes<HTMLAnchorElement>;
const ExternalLinkMenuItem: FC<ExternalLinkMenuItemProps> = (props) => {
	return <MenuItem><a target="_blank" {...props} /></MenuItem>;
};

const RootMenuItem = ({children, ...rest}) => {
	return (
		<MenuItemsBox {...rest}>
			{children}
		</MenuItemsBox>
	)
};

const SidebarNav = () => {
	return (
		<Sidebar>
			<RootMenuItem>
				<LocationAwareLinkMenuItem to={'/page1'}>Page 1</LocationAwareLinkMenuItem>
				<LocationAwareLinkMenuItem to={'/page2'}>Page 2</LocationAwareLinkMenuItem>
				<LocationAwareLinkMenuItem to={'/page3'}>Page 3</LocationAwareLinkMenuItem>
				<ExternalLinkMenuItem href={'http://google.com'}>Google</ExternalLinkMenuItem>
			</RootMenuItem>
		</Sidebar>
	)
};

const items = [
	{to: '/page1', label: 'Page 1', id: 'page1'},
	{to: '/page2', label: 'Page 2', id: 'page2'},
	{to: '/page3', label: 'Page 3', id: 'page3'},
	{href: 'http://google.com', label: 'Google', type: 'externalLink', id: 'google'},
];


type Schema = {
	defaultType: string,
	types: {[key: string]: ReactType}
}
const schema: Schema = {
	defaultType: 'link',
	types: {
		link: LocationAwareLinkMenuItem,
		externalLink: ExternalLinkMenuItem
	}
};

type Item = {
	id: string;
	type?: string;
	items?: Item[];

	label: string;
}

type MenuProps = {
	schema: Schema,
	items: Item[]
}
const Menu: FC<MenuProps> = ({schema, items}) => {
	return (
		<RootMenuItem>
			{items.map(item => {
				const type = item.type || schema.defaultType;
				const ItemComponent = schema.types[type];
				return <ItemComponent key={item.id} {...item}>{item.label}</ItemComponent>;
			})}
		</RootMenuItem>
	)
};

const BoundSidebarNav = () => {
	return (
		<Sidebar>
			<Menu schema={schema} items={items} />
		</Sidebar>
	)
};


const SectionMenuItem = (props) => {
	return <div>{props.children}</div>;
};

const nestedSchema: Schema = {
	defaultType: 'link',
	types: {
		section: SectionMenuItem,
		link: LocationAwareLinkMenuItem,
		externalLink: ExternalLinkMenuItem
	}
};

const nestedItems = [
	{
		label: 'Section 1', type: 'section', id: 'section1',
		items: [
			{to: '/page1', label: 'Page 1', id: 'page1'},
			{to: '/page2', label: 'Page 2', id: 'page2'},
		]
	},
	{
		label: 'Section 2', type: 'section', id: 'section2',
		items: [
			{to: '/page3', label: 'Page 3', id: 'page3'},
			{href: 'http://google.com', label: 'Google', type: 'externalLink', id: 'google'},
		]
	}
];

const BoundNestedSidebarNav = () => {
	return (
		<Sidebar>
			<Menu schema={nestedSchema} items={nestedItems} />
		</Sidebar>
	)
};

const ExpanderExample = () => {
	const [expanded, setExpanded] = useState(false);
	return <div style={{padding: 10}}><Expander expanded={expanded} size={30} lineWidth={5} onClick={() => setExpanded(!expanded)} /></div>
};

storiesOf('Menu', module).add('Declarative, one level with routing', () => (
	<Router history={history}>
		<Shell>
			<SidebarNav />
			<Route path="/page1" component={Page1} />
			<Route path="/page2" component={Page2} />
			<Route path="/page3" component={Page3} />
		</Shell>
	</Router>
)).add('Bound, one level with routing', () => (
	<Router history={history}>
		<Shell>
			<BoundSidebarNav />
			<Route path="/page1" component={Page1} />
			<Route path="/page2" component={Page2} />
			<Route path="/page3" component={Page3} />
		</Shell>
	</Router>
)).add('Bound, nested with routing', () => (
	<Router history={history}>
		<Shell>
			<BoundNestedSidebarNav />
			<Route path="/page1" component={Page1} />
			<Route path="/page2" component={Page2} />
			<Route path="/page3" component={Page3} />
		</Shell>
	</Router>
)).add('Expander', () => (
	<ExpanderExample />
));
