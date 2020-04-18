import React from 'react';
import { Box, Icon } from '@chakra-ui/core';

export const MenuIcon = ({ icon, ...props }) => {
	if (typeof icon === 'string') {
		return <Icon focusable={false} aria-hidden="true" name={icon} color="currentColor" {...props} />;
	}
	return <Box as={icon} data-custom-icon aria-hidden="true" color="currentColor" {...props} />;
};
