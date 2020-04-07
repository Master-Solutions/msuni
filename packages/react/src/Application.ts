import {ReactContextProvidersAspectMixin} from "./aspects/Composition/ReactContextProvidersAspect";
import {RoutingAspectMixin} from "./aspects/Routing/RoutingAspect";
import {ComponentsRegistryAspectMixin} from "./aspects/ComponentRegistry/ComponentsRegistryAspect";
import {ResourceManagementAspectMixin} from "./aspects/ResourceManagement/ResourceManagementAspect";
import {Context} from "./Context";
import {LayoutsAspectMixin} from "./aspects/Composition/LayoutsAspect";
import {PagesAspectMixin} from "./aspects/Composition/PagesAspect";


class Application extends
    RoutingAspectMixin(
        PagesAspectMixin(
            LayoutsAspectMixin(
                ReactContextProvidersAspectMixin(
                    ComponentsRegistryAspectMixin(
                        ResourceManagementAspectMixin(
                            Context
                        )
                    )
                )
            )
        )
    )
{

}

// I would prefer the following mixin syntax but TS intellisense not working with it
// class UniReactApplication extends mix(Context).with(
//     ResourceManagementAspectMixin,
//     ComponentsRegistryAspectMixin
//     ...
// ) {
//
// }

export default Application;

