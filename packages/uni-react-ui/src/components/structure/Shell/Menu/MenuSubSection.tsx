import React, { useState } from 'react';
import { Flex, Box, useTheme } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { MenuItemType } from './menuTypes';
import { MenuIcon } from './MenuIcon';
import { MenuItemCompositeContainer } from './helpers/MenuItemCompositeContainer';

type MenuSectionProps = MenuItemType & {
	expanded?: boolean;
	setExpanded: (boolean) => void;
	expandable?: boolean;
	theme?: object;
};

const ItemTitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	&:hover {
		background-color: ${(props) => props.theme['colors']['main']['700']};
		cursor: pointer;
	}
`;

const Title = styled(Box)({
	textTransform: 'uppercase',
	fontSize: '13px',
	color: '#ffffffcc',
	padding: '5px 0px 3px 0px',
});

export const MenuSubSection: React.FC<MenuSectionProps> = (props) => {
	const theme = useTheme();
	const icon = props.expanded ? 'chevron-down' : 'chevron-right';
	const expandable = props.expandable !== false;

	const toggle = () => (expandable ? props.setExpanded(!props.expanded) : () => undefined);

	const backgroundColor = props.expanded ? theme['colors']['main']['700'] : 'inherit';

	return (
		<MenuItemCompositeContainer
			style={{ backgroundColor }}
			titleTemplate={
				<ItemTitleContainer onClick={toggle}>
					<Flex alignItems="center">
						<MenuIcon icon={props.icon} size="12px" ml="25px" />
						<Title ml="10px">{props.title}</Title>
					</Flex>
					{expandable && <MenuIcon icon={icon} size="16px" mr="16px" />}
				</ItemTitleContainer>
			}>
			{props.expanded ? props.children : null}
		</MenuItemCompositeContainer>
	);
};

export default (props) => {
	const [expanded, setExpanded] = useState(true);
	return <MenuSubSection expanded={expanded} setExpanded={setExpanded} {...props} />;
};
