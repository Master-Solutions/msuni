/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';

type ArrowDir = "left" | "right";

export type ExpanderProps = {
	expanded?: boolean;
	onClick?: () => void;
	collapsedArrowDir?: ArrowDir;
	size?: number;
	lineWidth?: number;
	color?: string;
}

export const Arrow = styled.div`		      
    transition: all .2s;
`;

const angles = {
	up: 135,
	right: 225,
	down: 315,
	left: 45
};

export const Expander: React.FC<ExpanderProps> = ({
  size = 10, lineWidth = 3, color = 'black',
  expanded = false,
  collapsedArrowDir = 'right',
  onClick
}) => {
	const collapsedAngle = angles[collapsedArrowDir];
	const expandedAngle = angles.down;
	const baseStyles = {
		width: `${size}px`,
		height: `${size}px`,
		borderLeft: `${lineWidth}px solid ${color}`,
		borderBottom: `${lineWidth}px solid ${color}`,
		transform: `rotate(${collapsedAngle}deg)`
	};

	// auto detecting rotation angle and dir +/- (shortest from collapsed to expanded)
	let angle = expandedAngle - collapsedAngle;
	if (angle > 180)
		angle = angle - 360;
	angle += collapsedAngle;

	const styles = expanded ? css`transform: rotate(${angle}deg);` : css`transform: rotate(${collapsedAngle}deg);`;
	return <Arrow css={css([baseStyles, styles])} onClick={onClick} />;
};

