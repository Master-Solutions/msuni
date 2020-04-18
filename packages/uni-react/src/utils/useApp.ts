import { useContext } from 'react';
import { appCtx } from '../appCtx';

export const useApp = () => useContext(appCtx);
