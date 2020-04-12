import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { GlobalStyle } from './GlobalStyle';

type AppLayoutContainerProps = {
   headerHeight: string;
   footerHeight: string;
   sidenavWidth: string;
};

const AppLayoutContainer = styled.div`
   margin: auto;
   display: grid;
   grid-template-columns: ${(props: AppLayoutContainerProps) => props.sidenavWidth} 1fr;
   grid-template-rows: ${(props: AppLayoutContainerProps) => props.headerHeight} 1fr ${(
         props: AppLayoutContainerProps
      ) => props.footerHeight};
   grid-template-areas:
      'sidenav header'
      'sidenav main'
      'sidenav footer';
   height: 100vh;
`;

type AppLayoutHeaderProps = {
   bgColor: string;
};

const AppLayoutHeader = styled.div`
   grid-area: header;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0 16px;
   background-color: ${(props: AppLayoutHeaderProps) => props.bgColor};
`;

type AppLayoutFooterProps = {
   bgColor: string;
};

const AppLayoutFooter = styled.div`
   grid-area: footer;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0 16px;
   background-color: ${(props: AppLayoutFooterProps) => props.bgColor};
`;

type AppLayoutSidenavProps = {
   bgColor: string;
};

const AppLayoutSidenav = styled.div`
   grid-area: sidenav;
   color: white;

   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   padding: 0 16px;

   background-color: ${(props: AppLayoutSidenavProps) => props.bgColor};
`;

type AppLayoutMainProps = {
   bgColor: string;
};

const AppLayoutMain = styled.div`
   grid-area: main;
   background-color: ${(props: AppLayoutMainProps) => props.bgColor};
   padding: 0 16px;
`;

export interface AppLayoutProps {
   // sizes
   headerHeight?: string;
   footerHeight?: string;
   sidenavWidth?: string;

   // colors
   headerBgColor?: string;
   footerBgColor?: string;
   sidenavBgColor?: string;
   mainBgColor?: string;

   // content
   headerLeft?: ReactNode;
   headerCenter?: ReactNode;
   headerRight?: ReactNode;
   footerLeft?: ReactNode;
   footerCenter?: ReactNode;
   footerRight?: ReactNode;
   sidenavTop?: ReactNode;
   sidenavCenter?: ReactNode;
   sidenavBottom?: ReactNode;

   header?: ReactNode;
}

const DefaultAppLayout = {
   headerHeight: '70px',
   footerHeight: '40px',
   sidenavWidth: '250px',

   headerBgColor: '#648ca6',
   footerBgColor: '#648ca6',
   sidenavBgColor: '#394263',
   mainBgColor: '#8fd4d9',
};

export class AppLayout extends React.Component<AppLayoutProps> {
   static Container = AppLayoutContainer;
   static Header = AppLayoutHeader;
   static Sidenav = AppLayoutSidenav;
   static Footer = AppLayoutFooter;
   static Main = AppLayoutMain;

   render() {
      return (
         <React.Fragment>
            <GlobalStyle />
            <AppLayout.Container
               headerHeight={this.props.headerHeight || DefaultAppLayout.headerHeight}
               footerHeight={this.props.footerHeight || DefaultAppLayout.footerHeight}
               sidenavWidth={this.props.sidenavWidth || DefaultAppLayout.sidenavWidth}>
               <AppLayout.Header
                  bgColor={this.props.headerBgColor || DefaultAppLayout.headerBgColor}>
                  <div>{this.props.headerLeft}</div>
                  <div>{this.props.headerCenter}</div>
                  <div>{this.props.headerRight}</div>
               </AppLayout.Header>
               <AppLayout.Sidenav
                  bgColor={this.props.sidenavBgColor || DefaultAppLayout.sidenavBgColor}>
                  <div>Sidenav Top</div>
                  <div>Sidenav Center</div>
                  <div>Sidenav Bottom</div>
               </AppLayout.Sidenav>
               <AppLayout.Main bgColor={this.props.mainBgColor || DefaultAppLayout.mainBgColor}>
                  {this.props.header}
                  {this.props.children}
               </AppLayout.Main>
               <AppLayout.Footer
                  bgColor={this.props.footerBgColor || DefaultAppLayout.footerBgColor}>
                  <div>{this.props.footerLeft}</div>
                  <div>{this.props.footerCenter}</div>
                  <div>{this.props.footerRight}</div>
               </AppLayout.Footer>
            </AppLayout.Container>
         </React.Fragment>
      );
   }
}
