import { Box } from '@chakra-ui/core';
import styled from '@emotion/styled';

export const ShellMain = styled(Box)({
	display: 'flex',
	gridArea: 'main',
	// border: 'solid 1px',
	overflowY: 'scroll',
}).withComponent('main');
