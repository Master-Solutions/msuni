import React from 'react';

export interface AppProps {
	app: any;
}

const Root: React.FC<AppProps> = (props) => {
	return <h1>Hello, {props.app.name}</h1>;
};

// class App extends React.Component {
//
//   constructor(props: AppProps) {
//     super(props);
//   }
//
//   render() {
//     return <h1>Hello World!</h1>
//   }
//
// }

export default Root;
