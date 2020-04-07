import React from 'react';
import useApp from "../../utils/useApp";

export interface IRComponentProps {
    id: string
}

export const RComponent: React.FC<IRComponentProps> = (props) => {
    const {app} = useApp();
    const {id, ...rest} = props;
    const Component = app.getComponent(id);
    return  <Component {...rest} />
};
