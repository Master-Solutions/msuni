import React from 'react';

export interface IAppProps {
  app: any
}

const Root: React.FC<IAppProps> = (props) => {
    return <h1>Hello, {props.app.name}</h1>
};

// class App extends React.Component {
//
//   constructor(props: IAppProps) {
//     super(props);
//   }
//
//   render() {
//     return <h1>Hello World!</h1>
//   }
//
// }

export default Root;
