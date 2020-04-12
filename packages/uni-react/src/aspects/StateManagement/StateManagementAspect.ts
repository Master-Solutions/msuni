import { Mixin, AnyConstructor } from '../../types';
import { ResourceManagementAspect } from '../ResourceManagement/ResourceManagementAspect';
import { Context } from '../../Context';
import { ResourceTypes } from '../../constants';
import ResourceInfo from '../ResourceManagement/ResourceInfo';
import { createStore, StoreProvider } from 'easy-peasy';
import { ReactContextProvidersAspect } from '../Composition/ReactContextProvidersAspect';

const STATE_CONTEXT_KEY = 'state';

export const StateManagementAspect = <
   T extends AnyConstructor<Context & ResourceManagementAspect & ReactContextProvidersAspect>
>(
   base: T
) => {
   class StateManagement extends base {
      constructor(...args: any[]) {
         super(...args);

         this.useProvider(STATE_CONTEXT_KEY, StoreProvider, () => ({ store: this.buildStore() }));
      }

      useModel(id: string, model: object) {
         return this.rm.add(new ResourceInfo(id, ResourceTypes.state, model));
      }

      getModel(id: string) {
         return this.rm.findByTypeAndId(ResourceTypes.state, id);
      }

      getModels() {
         return this.rm.findByType(ResourceTypes.state);
      }

      buildStore() {
         const rootModel = {};
         this.getModels().forEach((ri) => {
            rootModel[ri.id] = ri.value;
         });
         return createStore(rootModel);
      }
   }

   return StateManagement;
};

export type StateManagementAspect = Mixin<typeof StateManagementAspect>;
