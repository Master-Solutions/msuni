import mapProps from './mapProps';

const withProps = (input) => {
   return mapProps((props) => ({
      ...props,
      ...(typeof input === 'function' ? input(props) : input),
   }));
};

export default withProps;
