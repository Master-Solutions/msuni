import React from 'react';

const mapProps = (propsMapper) => (BaseComponent) => {
   return (props) => React.createElement(BaseComponent, propsMapper(props));
};

export default mapProps;
