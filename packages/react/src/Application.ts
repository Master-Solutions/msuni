import { Context } from './Context';
import { ReactContextProvidersAspect } from './aspects/Composition/ReactContextProvidersAspect';
import { RoutingAspect } from './aspects/Routing/RoutingAspect';
import { ComponentsRegistryAspect } from './aspects/ComponentRegistry/ComponentsRegistryAspect';
import { ResourceManagementAspect } from './aspects/ResourceManagement/ResourceManagementAspect';
import { LayoutsAspect } from './aspects/Composition/LayoutsAspect';
import { PagesAspect } from './aspects/Composition/PagesAspect';

export class Application extends RoutingAspect(
   PagesAspect(
      LayoutsAspect(
         ReactContextProvidersAspect(ComponentsRegistryAspect(ResourceManagementAspect(Context)))
      )
   )
) {}

// I would prefer the following mixin syntax but TS intellisense not working with it
// class Application extends mix(Context).with(
//     ResourceManagementAspect,
//     ComponentsRegistryAspect
//     ...
// ) {
//
// }
