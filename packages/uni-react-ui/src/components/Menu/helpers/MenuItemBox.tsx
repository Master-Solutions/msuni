/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx, SerializedStyles } from '@emotion/core';

export type MenuItemStyleProps = {
	baseCss?: SerializedStyles;
	activeCss?: SerializedStyles;
}

export type ActiveAware = {
	active?: boolean;
}

type MenuItemBoxProps = ActiveAware & MenuItemStyleProps;

export const MenuItemBoxElement = styled.li`	
	display: flex;
	align-items: center;	
`;

export const MenuItemBox: React.FC<MenuItemBoxProps> = (props) => {
	const styles = [props.baseCss];
	if (props.active) {
		styles.push(props.activeCss);
	}

	return (
		<MenuItemBoxElement css={css(styles)}>{props.children}</MenuItemBoxElement>
	);
};

