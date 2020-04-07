import React from "react";
import useApp from "./useApp";


const withAppRoutes = BaseComponent => {
    return props => {
        const { app } = useApp();
        const routes = app.getRoutes(); // as IRouteProps[];
        return <BaseComponent routes={routes} {...props} />;
    }
};

export default withAppRoutes;