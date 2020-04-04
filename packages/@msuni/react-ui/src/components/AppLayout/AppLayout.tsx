import React from "react";
import styled from '@emotion/styled';
import { space, layout, color, border } from 'styled-system';




const AppLayout = ({headerHeight = "70px", footerHeight = "70px", sidenavWidth="250px"}) => {
  return (
    <AppLayout.Container>
        <AppLayout.Header>
            <div>Left Header</div>
            <div>Center Header</div>
            <div>Right Header</div>
        </AppLayout.Header>
        <AppLayout.Sidenav>Sidenav</AppLayout.Sidenav>
        <AppLayout.Main>Main</AppLayout.Main>
        <AppLayout.Footer>
            <div>Left Footer</div>
            <div>Center Footer</div>
            <div>Right Footer</div>
        </AppLayout.Footer>
    </AppLayout.Container>
  )
};

AppLayout.Container = styled.div`
    display: grid;
    grid-template-columns: 240px 1fr;
    grid-template-rows: 50px 1fr 50px;
    grid-template-areas:
        "sidenav header"
        "sidenav main"
        "sidenav footer";
    height: 100vh;    
`;


AppLayout.Header = styled.div`
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    background-color: #648ca6;
`;

AppLayout.Sidenav = styled.div`
    grid-area: sidenav;
    color: white;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;    
    
    background-color: #394263;
`;

AppLayout.Main = styled.div`
    grid-area: main;
    background-color: #8fd4d9;
`;

AppLayout.Footer = styled.div`
    grid-area: footer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    background-color: #648ca6;
`;


export default AppLayout;