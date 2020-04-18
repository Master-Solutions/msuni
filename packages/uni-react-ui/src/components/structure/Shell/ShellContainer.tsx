import { Grid } from '@chakra-ui/core';
import styled from '@emotion/styled';

type ShellContainerProps = {
	headerHeight?: string;
	sidebarWidth?: string;
	footerHeight?: string;
	collapseSidebarAtBreakpoint?: number;
	theme?: object;
};

const defaultProps = {
	headerHeight: '100px',
	sidebarWidth: '250px',
	footerHeight: '70px',
	collapseSidebarAtBreakpoint: 1,
};

export const ShellContainer = styled(Grid)(
	{
		height: '100vh',
	},
	(props: ShellContainerProps = defaultProps) => {
		// when sidebar is collapsed/sliding in/out, we have one-column grid
		// with sidebar, it's 2-column grid
		const templateColumnsNoSidebar = '1fr';
		const templateRowsNoSidebar = `${props.headerHeight} 1fr ${props.footerHeight}`;
		const templateAreasNoSidebar = "'header' 'main' 'footer'";

		const templateColumns = `${props.sidebarWidth} 1fr`;
		const templateRows = `${props.headerHeight} 1fr ${props.footerHeight}`;
		const templateAreas = "'sidebar header' 'sidebar main' 'sidebar footer'";

		const breakpoints = props.theme['breakpoints'];
		const mq = breakpoints.map((bp) => `@media (min-width: ${bp})`);

		return {
			gridTemplateColumns: templateColumnsNoSidebar,
			gridTemplateRows: templateRowsNoSidebar,
			gridTemplateAreas: templateAreasNoSidebar,
			[mq[props.collapseSidebarAtBreakpoint]]: {
				gridTemplateColumns: templateColumns,
				gridTemplateRows: templateRows,
				gridTemplateAreas: templateAreas,
			},
		};
	}
);
