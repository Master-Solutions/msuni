import React from 'react';

export interface TestProps {
	name?: string;
}

export const Test = (props: TestProps) => <div data-testid="t">Test: {props.name || 'default'}</div>;
