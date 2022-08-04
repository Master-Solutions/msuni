import React, { useContext } from 'react';
import { useTheme, Flex } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { MenuItemCompositeContainer } from './helpers/MenuItemCompositeContainer';
import { MenuItemType } from './menuTypes';
import { MenuContext } from './Menu';

type MenuSectionProps = MenuItemType;

const Title = styled(Flex)({
	alignItems: 'center',
	width: '100%',
	textTransform: 'uppercase',
	fontSize: '15px',
	color: '#ffffff88',
	padding: '8px 16px',
});

export const MenuSection: React.FC<MenuSectionProps> = (props) => {
	const theme = useTheme();
	const {palette, colorLevel} = useContext(MenuContext);

	const backgroundColor = theme['colors'][palette][colorLevel];

	return (
		<MenuItemCompositeContainer style={{backgroundColor}} title={<Title>{props.title}</Title>}>
			{props.children}
		</MenuItemCompositeContainer>
	);
};
