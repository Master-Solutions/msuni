import React from 'react';

//
// const Part: React.FC<{}> = (props) => {
//   return props.children;
// } ;
//
//
// interface MPCProps {
//   layout: React.Component,
//   layoutPropsMap?: object
// }
//
//
// export class MPC extends React.Component<MPCProps> {
//
//   render() {
//     const Layout = this.props.layout;
//     const layoutMapping = this.props.layoutPropsMap || {};
//     const layoutProps = {};
//
//     (Object.keys(layoutMapping)).forEach(pKey => {
//       layoutProps[pKey] = this.props.children.filter(p => layoutMapping[pKey].includes(p.props.name))
//     });
//
//     console.log(layoutMapping);
//     return <Layout {...layoutProps}/>;
//   }
//
// }

// MultiPartComponent.propTypes = {
//   layout: PropTypes.func.isRequired,
//   layoutMapping: PropTypes.object,
//   children: function (props, propName, componentName) {
//     const prop = props[propName];
//
//     let error = null;
//     React.Children.forEach(prop, function (child) {
//       if (child.type.name !== 'Part') {
//         error = new Error('`' + componentName + '` children should be of type `Part`.');
//       }
//     });
//
//     return error
//   }
// };
