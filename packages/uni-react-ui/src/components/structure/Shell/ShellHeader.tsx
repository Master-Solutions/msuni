import { Flex } from '@chakra-ui/core';
import styled from '@emotion/styled';

export const ShellHeader = styled(Flex)(
	{
		display: 'flex',
		gridArea: 'header',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0 16px',

		boxShadow: '0 4px 5px rgba(0, 0, 0, 0.5)',

		position: 'sticky',
		top: 0,
		// position: 'fixed',
		// left: 0,
		// right: 0,
		// // width: '100%',
		// height: '50px'
	},
	(props) => {
		return {
			backgroundColor: props.theme['colors']['primary'],
			color: props.theme['colors']['text'],
		};
	}
).withComponent('header');
