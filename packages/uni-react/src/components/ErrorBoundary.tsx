import React from 'react';

type ErrorBoundaryProps = {
	showError?: boolean;
};

type ErrorBoundaryState = {
	readonly error: Error | null | undefined;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}

	componentDidCatch(error, info) {
		this.setState({ error });
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, info);
	}

	render() {
		if (this.state.error) {
			if (this.props.showError) return <h3>{this.state.error.message}</h3>;
			return <h1>Something went wrong.</h1>;
		}
		return this.props.children;
	}
}
