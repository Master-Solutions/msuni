import styled from '@emotion/styled';
import { space, layout, color, border } from 'styled-system';


const Box = styled('div')(
    {
        boxSizing: 'border-box',
        margin: 0,
        minWidth: 0,
    },
    space,
    layout,
    color,
    border
);

export default Box;