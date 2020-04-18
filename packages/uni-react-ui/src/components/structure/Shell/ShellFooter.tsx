import { Flex } from '@chakra-ui/core';
import styled from '@emotion/styled';

export const ShellFooter = styled(Flex)(
	{
		display: 'flex',
		gridArea: 'footer',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0 16px',

		position: 'sticky',
		bottom: 0,
	},
	(props) => {
		return {
			backgroundColor: props.theme['colors']['primary'],
			color: props.theme['colors']['text'],
		};
	}
).withComponent('footer');
