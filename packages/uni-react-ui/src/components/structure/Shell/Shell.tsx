import React, { ReactNode } from 'react';
import { CSSReset, Box } from '@chakra-ui/core';
import { ShellHeader } from './ShellHeader';
import { ShellSidebar } from './ShellSidebar';
import { ShellMain } from './ShellMain';
import { ShellFooter } from './ShellFooter';
import { ShellContainer } from './ShellContainer';

export interface ShellProps {
	// sizes
	headerHeight?: string;
	footerHeight?: string;
	sidebarWidth?: string;

	// colors
	headerBgColor?: string;
	footerBgColor?: string;
	sidebarBgColor?: string;
	mainBgColor?: string;

	// content
	headerLeft?: ReactNode;
	headerCenter?: ReactNode;
	headerRight?: ReactNode;
	footerLeft?: ReactNode;
	footerCenter?: ReactNode;
	footerRight?: ReactNode;
	sidebarTop?: ReactNode;
	sidebarCenter?: ReactNode;
	sidebarBottom?: ReactNode;

	sidebarCollapseAtBreakpoint?: number;
}

const defaultProps = {
	headerHeight: '70px',
	footerHeight: '40px',
	sidebarWidth: '250px',

	headerBgColor: '#648ca6',
	footerBgColor: '#648ca6',
	sidebarBgColor: '#394263',
	mainBgColor: '#8fd4d9',

	sidebarCollapseAtBreakpoint: 1,
};

export const Shell: React.FC<ShellProps> = (props) => {
	props = {
		...defaultProps,
		...props,
	};

	return (
		<React.Fragment>
			<CSSReset />
			<ShellContainer
				headerHeight={props.headerHeight}
				sidebarWidth={props.sidebarWidth}
				footerHeight={props.footerHeight}
				collapseSidebarAtBreakpoint={props.sidebarCollapseAtBreakpoint}>
				<ShellHeader>
					<div>{props.headerLeft}</div>
					<div>{props.headerCenter}</div>
					<div>{props.headerRight}</div>
				</ShellHeader>
				<ShellSidebar width={props.sidebarWidth} collapseAtBreakpoint={props.sidebarCollapseAtBreakpoint}>
					<Box w="100%">{props.sidebarTop}</Box>
					<Box w="100%">{props.sidebarBottom}</Box>
				</ShellSidebar>
				<ShellMain>{props.children}</ShellMain>
				<ShellFooter>
					<div>{props.footerLeft}</div>
					<div>{props.footerCenter}</div>
					<div>{props.footerRight}</div>
				</ShellFooter>
			</ShellContainer>
		</React.Fragment>
	);
};
