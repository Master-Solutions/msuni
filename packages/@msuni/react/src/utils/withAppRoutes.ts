import React, {useContext} from "react";
import Application from "../Application";
import appCtx from "../appCtx";

// interface IUseAppProps {
//
// }



const withApp = <TProps extends {app: Application}>(Wrapped: React.ComponentType<TProps>) => {
    return (props: TProps) => {
        const app = useContext(appCtx);
        return React.createElement(Wrapped, Object.assign({app}, props));
    }
};

// const withAppProps = (props: IUseAppProps = {}) => {
//     return <TProps extends {app: Application}>(Wrapped: React.ComponentType<TProps>) => {
//         return (props: TProps & IUseAppProps) => {
//             const app = useContext(appCtx);
//             return React.createElement(Wrapped, props)
//         }
//     }
// };

export default withApp;