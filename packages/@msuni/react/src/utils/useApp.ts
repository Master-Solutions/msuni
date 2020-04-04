import {useContext} from "react";
import appCtx, {IAppAware} from "../appCtx";

const useApp = () => useContext(appCtx) as IAppAware;

export default useApp;