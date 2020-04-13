import React from 'react';
import { useApp } from '../../utils/useApp';

export interface RComponentProps {
	id: string;
}

export const RComponent: React.FC<RComponentProps> = (props) => {
	const app = useApp();
	const { id, ...rest } = props;
	const Component = app.getComponent(id);
	return <Component {...rest} />;
};
