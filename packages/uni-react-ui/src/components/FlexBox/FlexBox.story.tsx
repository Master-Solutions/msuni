import React from 'react';
import { storiesOf } from '@storybook/react';
// import styled from '@emotion/styled';

import { FlexBox } from './FlexBox';
import { Box } from '../Box/Box';

// const itemStyle = {
//    width: 100,
//    height: 30,
//    border: '2px solid green',
// };

// const ItemBox = styled(Box)(itemStyle);
// const Item = (props) => <ItemBox m={3}>{props.name}</ItemBox>;

// storiesOf("FlexBox", module).add(
//     "text test",
//     () => (
//         <ThemeProvider theme={theme}>
//             <FlexBox width={1/2} height={300} border="4px solid red" alignContent='center' alignItems='center' flexDirection="column">
//                 <Item name="Item 1"/>
//                 <Item name="Item 2"/>
//                 <Item name="Item 3"/>
//             </FlexBox>
//         </ThemeProvider>
//
//     )
// );

storiesOf('FlexBox', module)
	.add('Basic', () => (
		<FlexBox alignItems="center">
			<Box width={1 / 2} p={3} color="white" bg="blue">
				FlexBox
			</Box>
			<Box width={1 / 2} p={1} color="white" bg="green">
				Box
			</Box>
		</FlexBox>
	))
	.add('Wrap', () => (
		<FlexBox flexWrap="wrap">
			<Box width={[1, 1 / 2]} p={3} color="white" bg="blue">
				FlexBox
			</Box>
			<Box width={[1, 1 / 2]} p={1} color="white" bg="green">
				Wrap
			</Box>
		</FlexBox>
	))
	.add('Justify', () => (
		<FlexBox justifyContent="space-around">
			<Box width={1 / 3} p={2} color="white" bg="blue">
				FlexBox
			</Box>
			<Box width={1 / 3} p={2} color="white" bg="green">
				Justify
			</Box>
		</FlexBox>
	))
	.add('deprecated align shim', () => (
		<FlexBox align="center">
			<Box width={1 / 2} p={3} color="white" bg="blue">
				FlexBox
			</Box>
			<Box width={1 / 2} p={1} color="white" bg="green">
				Box
			</Box>
		</FlexBox>
	))
	.add('deprecated bg shim', () => (
		<FlexBox bg="blue">
			<Box width={1 / 2} p={3} color="white" bg="blue">
				FlexBox
			</Box>
			<Box width={1 / 2} p={1} color="white" bg="green">
				Box
			</Box>
		</FlexBox>
	));
