import {IRouteProps} from "./RoutingAspect";
import React from "react";
import useApp from "../../utils/useApp";


export interface IRoutesProps {
    routes: IRouteProps[]
}

// const Route: React.FC<IRouteProps> = (props) => {
// }


const Routes: React.FC<IRoutesProps> = ({routes = []}) => {
    const { app } = useApp();
    const Router = app.getComponent('routing.router');
    const Switch = app.getComponent('routing.switch');

    const rootElements = routes.map((route) => this.createRoute(route));
    return (
        <Router>
            <Switch>
                TestRoutes
                {
                    routes.map(route => {
                    })
                }
            </Switch>
        </Router>
    );
};

export default Routes;