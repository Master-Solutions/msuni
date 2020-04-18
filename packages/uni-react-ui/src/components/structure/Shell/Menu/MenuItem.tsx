import React from 'react';
import { Link } from '@chakra-ui/core';
import { MenuIcon } from './MenuIcon';
import { MenuItemType } from './menuTypes';
import styled from '@emotion/styled';

type MenuNavLinkProps = MenuItemType;

export const MenuItemContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	&:hover {
		background-color: ${(props) => props.theme['colors']['main']['800']};
		cursor: pointer;
	}
	& > a {
		font-size: 13px;
		text-transform: uppercase;
		padding: 2px 0px;
	}
`;

export const MenuItem: React.FC<MenuNavLinkProps> = (props) => {
	return (
		<MenuItemContainer>
			<MenuIcon icon={props.icon} size="12px" ml="40px" />
			<Link ml="10px">{props.title}</Link>
		</MenuItemContainer>
	);
};
