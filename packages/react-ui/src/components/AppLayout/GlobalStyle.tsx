import React from 'react';
import { Global, css } from '@emotion/core';

export const GlobalStyle = (props) => (
   <Global
      {...props}
      styles={css`
         html {
            font-family: sans-serif;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
         }
         body {
            margin: 0;
            padding: 0;
            font-family: 'Roboto', 'HelveticaNeue', 'Helvetica Neue', sans-serif;
         }
      `}
   />
);
