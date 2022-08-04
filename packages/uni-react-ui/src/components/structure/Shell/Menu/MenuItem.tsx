import React, { useContext } from 'react';
import { Link, useTheme} from '@chakra-ui/core';
import { MenuIcon } from './MenuIcon';
import { MenuItemType } from './menuTypes';
import styled from '@emotion/styled';
import { MenuContext } from './Menu';

type MenuNavLinkProps = MenuItemType;

interface MenuItemContainerProps {
	hoverBgColor: string
}

export const MenuItemContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	color: white;
	&:hover {
		background-color: ${(props: MenuItemContainerProps) => props.hoverBgColor};
		cursor: pointer;
	}
	& > a {
		font-size: 13px;
		text-transform: uppercase;
		padding: 2px 0px;
	}
`;

export const MenuItem: React.FC<MenuNavLinkProps> = (props) => {
	const theme = useTheme();
	const {palette, colorLevel} = useContext(MenuContext);

	const backgroundColor = theme['colors'][palette][colorLevel + 200];

	return (
		<MenuItemContainer hoverBgColor={backgroundColor}>
			<MenuIcon icon={props.icon} size="12px" ml="40px" />
			<Link ml="10px">{props.title}</Link>
		</MenuItemContainer>
	);
};
