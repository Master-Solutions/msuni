import React, { ReactElement, ReactNode, ComponentType } from 'react';

interface PartProps {
   id: string;
   children: ReactNode;
}

export const Part: React.FC<PartProps> = (props) => {
   return <React.Fragment>{props.children}</React.Fragment>;
};

interface MPCProps {
   layout?: ComponentType;
   layoutPropsMap?: object;
   children: Array<ReactElement<PartProps>>; //ReactElement<PartProps> | Array<ReactElement<PartProps>>
}

export class MPC extends React.Component<MPCProps> {
   static Part = Part;

   render() {
      const Layout = this.props.layout || (({ children }) => <div>{children}</div>);
      const layoutPropsMap = this.props.layoutPropsMap || {};

      const partsMap = {};
      const parts = this.props.children;
      parts.forEach((p) => (partsMap[p.props.id] = p));

      const layoutProps = {};
      const referencedParts = {};

      // layoutPropsMap is a map: region => array of parts
      // not referenced parts should go into children
      Object.keys(layoutPropsMap).forEach((region) => {
         layoutProps[region] = (layoutPropsMap[region] || []).map((id) => {
            const pChildren = partsMap[id];
            if (!(id in referencedParts)) referencedParts[id] = true;
            return pChildren;
         });
      });

      if (!('children' in layoutProps)) layoutProps['children'] = [];

      layoutProps['children'] = [].concat(
         layoutProps['children'],
         parts.filter((p) => !referencedParts[p.props.id])
      );

      return <Layout {...layoutProps} />;
   }
}

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
