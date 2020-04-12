import styled from '@emotion/styled';
import { buttonStyle, space, fontSize, variant } from 'styled-system';

export const Button = styled('button')(
   {
      appearance: 'none',
      fontFamily: 'inherit',
      border: 0,
      outline: 0,
   },
   buttonStyle,
   space,
   fontSize,
   variant({
      scale: 'buttons',
      prop: 'variant',
      variants: {
         primary: {
            color: 'white',
            bg: 'primary',
         },
         secondary: {
            color: 'white',
            bg: 'secondary',
         },
      },
   }),
   variant({
      scale: 'buttonSizes',
      prop: 'size',
      // variants: {
      //
      // }
   })
);

Button.defaultProps = {
   variant: 'primary',
   px: 4,
   py: 2,
   fontSize: 2,
};
