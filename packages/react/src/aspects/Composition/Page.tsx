import React from 'react';
import useApp from '../../utils/useApp';
import { PageProps } from './PagesAspect';
import { MPC } from './MPC';

const PageTitle = ({ name }) => <h1>{name}</h1>;

export const Page: React.FC<PageProps> = (props) => {
   const { app } = useApp();

   const layout = props.layout || 'default';
   const Layout = app.getComponent(`layouts.${layout}`);

   const layoutPropsMap = {
      header: ['pageTitle'],
   };

   const parts = [
      <MPC.Part id="pageTitle" key="pageTitle">
         <PageTitle name={props.name} />
      </MPC.Part>,
   ];

   props.widgets.forEach((w, i) => {
      const componentId = typeof w === 'string' ? w : w.id;
      const id = typeof w === 'string' ? w : w.key || w.id;
      const Component = app.getComponent(componentId);
      const props = typeof w !== 'string' ? w.props || {} : {};

      parts.push(
         <MPC.Part id={id} key={id}>
            <Component {...props} />
         </MPC.Part>
      );

      const region = typeof w === 'string' ? 'children' : w.region || 'children';
      if (!(region in layoutPropsMap)) layoutPropsMap[region] = [];
      layoutPropsMap[region].push(id);
   });

   //console.log(layoutPropsMap);

   return (
      <MPC layout={Layout} layoutPropsMap={layoutPropsMap}>
         {parts}
      </MPC>
   );
};
