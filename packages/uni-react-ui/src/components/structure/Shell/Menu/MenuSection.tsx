import React from 'react';
import { Flex } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { MenuItemCompositeContainer } from './helpers/MenuItemCompositeContainer';
import { MenuItemType } from './menuTypes';

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
	return (
		<MenuItemCompositeContainer titleTemplate={<Title>{props.title}</Title>}>
			{props.children}
		</MenuItemCompositeContainer>
	);
};
