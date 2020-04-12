import { useContext } from 'react';
import { appCtx } from '../appCtx';

const useApp = () => useContext(appCtx);

export default useApp;
