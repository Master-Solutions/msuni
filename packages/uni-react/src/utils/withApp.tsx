import React from 'react';
import { useApp } from './useApp';

export const withApp = (BaseComponent) => {
	return (props) => {
		const app = useApp();
		return <BaseComponent app={app} {...props} />;
	};
};
