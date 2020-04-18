import React from 'react';
import { useApp } from './useApp';

export const withAppRoutes = (BaseComponent) => {
	return (props) => {
		const app = useApp();
		const routes = app.getRoutes();
		return <BaseComponent routes={routes} {...props} />;
	};
};
