import React from 'react';
import { Flex, Text, Icon } from '@chakra-ui/core';

export const Brand = () => {
	return (
		<Flex w="100%" p={3} alignItems="center" justifyContent="space-between" direction="column">
			<Icon name="check-circle" size="28px" />
			<Text>My App</Text>
		</Flex>
	);
};
