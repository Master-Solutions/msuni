import React, { useState } from 'react';
import { Flex } from '@chakra-ui/core';
import styled from '@emotion/styled';

type MenuContext = {
	palette: string;
	colorLevel: number;
	getItemState: (name: string) => object;
	setItemState: (name: string, newItemState) => void;
}
export const MenuContext = React.createContext<MenuContext>({
	palette: 'main',
	colorLevel: 600,
	getItemState: () => undefined,
	setItemState: () => undefined
});

type MenuProps = {
	palette?: string;
	colorLevel?: number;
	// items?: MenuItemType[]
}

export const MenuContainer = styled(Flex)({
	width: '100%',
	flexDirection: 'column',
});

export const Menu: React.FC<MenuProps> = (props) => {
	const [state, setState] = useState({
		palette: props.palette || 'main',
		colorLevel: props.colorLevel || 600,
		byItem: {}
	});
	return (
		<MenuContext.Provider value={{
			palette: state.palette,
			colorLevel: state.colorLevel,
			getItemState: (name) => state.byItem[name] || {},
			setItemState: (name, newItemState) => {
				const byItem = {};
				byItem[name] = Object.assign(state.byItem[name] || {}, newItemState);
				const newState = {...state, byItem: {...state.byItem, ...byItem}};
				console.log(newState);
				setState(newState);
			}
		}}>
			<MenuContainer>{props.children}</MenuContainer>
		</MenuContext.Provider>
	);

};
