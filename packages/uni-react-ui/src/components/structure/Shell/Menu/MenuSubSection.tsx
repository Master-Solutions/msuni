import React, { useContext, useState } from 'react';
import { Flex, Box, useTheme } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { MenuItemType } from './menuTypes';
import { MenuIcon } from './MenuIcon';
import { MenuItemCompositeContainer } from './helpers/MenuItemCompositeContainer';
import { MenuContext } from './Menu';

type MenuSectionProps = MenuItemType & {
	expanded?: boolean;
	setExpanded: (boolean) => void;
	expandable?: boolean;
	theme?: object;
};

interface ItemTitleContainerProps {
	hoverBgColor: string
}

const ItemTitleContainer = styled.div<ItemTitleContainerProps>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	color: #ffffffcc;
	&:hover {
		background-color: ${props => props.hoverBgColor};
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
	const {palette, colorLevel, getItemState, setItemState} = useContext(MenuContext);

	const itemState = getItemState(props.name) as any;
	const expanded = itemState.expanded ;

	const icon = expanded ? 'chevron-down' : 'chevron-right';
	const expandable = props.expandable !== false;

	const toggle = () => (expandable ? setItemState(props.name, {expanded: !expanded}) : () => undefined);

	const backgroundColor = expanded ? theme['colors'][palette][colorLevel + 100] : 'inherit';

	return (
		<MenuItemCompositeContainer
			style={{ backgroundColor }}
			title={
				<ItemTitleContainer onClick={toggle} hoverBgColor={backgroundColor}>
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
