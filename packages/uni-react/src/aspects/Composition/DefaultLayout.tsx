/* eslint-disable */
import React from 'react';

interface DefaultLayoutProps {
	header?: React.ReactNode;
	footer?: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
	return (
		<div>
			<div role="header">{props.header}</div>
			<div role="main">{props.children}</div>
			<div role="footer">{props.footer}</div>
		</div>
	);
};
