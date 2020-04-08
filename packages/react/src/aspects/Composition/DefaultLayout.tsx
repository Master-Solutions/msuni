import React from 'react';

interface DefaultLayoutProps {
   header?: React.ReactNode;
   footer?: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
   return (
      <div>
         <div data-testid="header">{props.header}</div>
         <div data-testid="main">{props.children}</div>
         <div data-testid="footer">{props.footer}</div>
      </div>
   );
};
