import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThemeProvider, theme, CSSReset, Flex, Box, Grid } from '@chakra-ui/core';
import { Shell } from './Shell';
import { Brand } from './Brand/Brand';
import { Menu } from './Menu/Menu';
import { MenuSection } from './Menu/MenuSection';
import MenuSubSection from './Menu/MenuSubSection';
import { MenuItem } from './Menu/MenuItem';

const customTheme = {
	...theme,
	colors: {
		...theme.colors,
		primary: '#3d4977',
		background: 'white',
		text: 'white',
		main: {
			50: '#edf0ff',
			100: '#cdd3e7',
			200: '#aeb5d1',
			300: '#8e98be',
			400: '#6e7baa',
			500: '#556191',
			600: '#414c71',
			700: '#2e3652',
			800: '#1b2034',
			900: '#050b18',
		},
	},
};

// console.dir(customTheme);

const SidebarMenu = ({palette = 'main', colorLevel = 600}) => {
	return (
		<Menu palette={palette} colorLevel={colorLevel}>
			<MenuSection name="dashboards" title="Dashboards">
				<MenuSubSection name="ss1" title="Sub Section 1" icon="star">
					<MenuItem name="page1" title="Page 1" icon="external-link" />
					<MenuItem name="page2" title="Page 2" icon="external-link" />
					<MenuItem name="page3" title="Page 3" icon="external-link" />
				</MenuSubSection>
				<MenuSubSection name="ss2" title="Sub Section 2" icon="star">
					<MenuItem name="page4" title="Page 4" icon="external-link" />
					<MenuItem name="page5" title="Page 5" icon="external-link" />
					<MenuItem name="page6" title="Page 6" icon="external-link" />
				</MenuSubSection>
			</MenuSection>
			<MenuSection name="services" title="Services">
				<MenuSubSection name="ss3" title="Sub 3" icon="star">
					<MenuItem name="service1" title="Service 1" icon="external-link" />
					<MenuItem name="service2" title="Service 2" icon="external-link" />
					<MenuItem name="service3" title="Service 3" icon="external-link" />
				</MenuSubSection>
			</MenuSection>
			<MenuSection name="links" title="Links Only">
				<MenuItem name="link1" title="Link 1" icon="external-link" />
				<MenuItem name="link2" title="Link 2" icon="external-link" />
				<MenuItem name="link3" title="Link 3" icon="external-link" />
			</MenuSection>
		</Menu>
	);
};

storiesOf('Shell & Menu', module).add('Default', () => (
	<ThemeProvider theme={customTheme}>
		{/*<CSSReset />*/}
		{/*<App />*/}
		{/*<br/>*/}
		{/*<SignUpForm />*/}
		<Shell
			headerHeight="50px"
			footerHeight="40px"
			sidebarWidth="200px"
			sidebarCollapseAtBreakpoint={2}
			headerLeft="Header Left"
			headerCenter="Header Center"
			headerRight="Header Right"
			sidebarTop={
				<React.Fragment>
					<Brand />
					<SidebarMenu />
				</React.Fragment>
			}
			sidebarBottom="Sidebar Bottom"
			footerLeft="Footer Left"
			footerCenter="Footer Center"
			footerRight="Footer Right">
			<div>

				Main
				<br />
				Main
				<br />
				Main
				<br />
				Main
				<br />
				Main
				<br />
				Main
				<br />
				Main
				<br />
				Main
				<br />
				Main
				<br />
				Main
				<br />
				Main
				<br />
				Main
				<br />
				Main
				<br />
				Main
				<br />
				Main
				<br />
				Main
				<br />
			</div>
		</Shell>
	</ThemeProvider>
)).add('Menus', () => (
	<ThemeProvider theme={customTheme}>
		<CSSReset />
		<Grid gap={1} templateColumns="repeat(7, 200px)" m={1}>
			<SidebarMenu />
			<SidebarMenu palette="orange"  />
			<SidebarMenu palette="red" />
			<SidebarMenu palette="green" />
			<SidebarMenu palette="blue" />
			<SidebarMenu palette="cyan" />
			<SidebarMenu palette="purple" />
		</Grid>
	</ThemeProvider>
));
