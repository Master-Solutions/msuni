import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/core';

type ShellSidebarProps = {
	width?: string;
	active?: boolean;
	collapseAtBreakpoint?: number;
	theme: object;
};

export const ShellSidebar = styled(Flex)(
	{
		display: 'flex',
		gridArea: 'sidebar',
		height: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',

		boxShadow: '0 0 4px rgba(0, 0, 0, 0.5)',

		zIndex: 2,
	},
	(props: ShellSidebarProps) => {
		const width = props.width || '250px';
		const active = props.active || false;
		const collapseAtBreakpoint = props.collapseAtBreakpoint || 1;

		const breakpoints = props.theme['breakpoints'];
		const mq = breakpoints.map((bp) => `@media (min-width: ${bp})`);

		const transformWidth = active ? '0' : `-${width}`;

		return {
			backgroundColor: props.theme['colors']['main']['600'],
			color: props.theme['colors']['text'],

			position: 'fixed',
			transform: `translateX(${transformWidth})`,
			transition: 'all .6s ease-in-out',

			// boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)",

			[mq[collapseAtBreakpoint]]: {
				position: 'relative',
				transform: 'translateX(0)',
			},
		};
	}
).withComponent('aside');
