import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/core';
import { color } from 'styled-system';

const MenuItemCompositeContainerElement = styled(Flex)({
	flexDirection: 'column',
	width: '100%',
});

type MenuItemCompositeContainerProps = {
	title: ReactNode;
	style?: object;
};

export const MenuItemCompositeContainer: React.FC<MenuItemCompositeContainerProps> = ({
	title,
	children,
	...rest
}) => {
	return (
		<MenuItemCompositeContainerElement {...rest}>
			{title}
			<MenuItemCompositeContainerElement>{children}</MenuItemCompositeContainerElement>
		</MenuItemCompositeContainerElement>
	);
};
