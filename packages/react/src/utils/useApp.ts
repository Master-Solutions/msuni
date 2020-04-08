import { useContext } from 'react';
import appCtx, { AppAware } from '../appCtx';

const useApp = () => useContext(appCtx) as AppAware;

export default useApp;
