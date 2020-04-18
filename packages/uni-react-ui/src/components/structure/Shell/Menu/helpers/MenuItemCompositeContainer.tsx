import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/core';
import { color } from 'styled-system';

const MenuItemCompositeContainerElement = styled(Flex)(
	{
		flexDirection: 'column',
		width: '100%',
	},
	color
);

type MenuItemCompositeContainerProps = {
	titleTemplate: ReactNode;
	style?: object;
};

export const MenuItemCompositeContainer: React.FC<MenuItemCompositeContainerProps> = ({
	titleTemplate,
	children,
	...rest
}) => {
	return (
		<MenuItemCompositeContainerElement {...rest}>
			{titleTemplate}
			<MenuItemCompositeContainerElement>{children}</MenuItemCompositeContainerElement>
		</MenuItemCompositeContainerElement>
	);
};
