import Context from "../uni/Context";
import {ResourceManagementAspectMixin} from "./aspects/ResourceManagementAspect";
import {ComponentsRegistryAspectMixin} from "./aspects/ComponentsRegistryAspect";
import {RoutingAspectMixin} from "./aspects/RoutingAspect";
import {PagesAndLayoutsAspectMixin} from "./aspects/PagesAndLayoutsAspect";
import {ReactContextProvidersAspectMixin} from "./aspects/ReactContextProvidersAspect";


class Application extends
    RoutingAspectMixin(
        PagesAndLayoutsAspectMixin(
            ReactContextProvidersAspectMixin(
                ComponentsRegistryAspectMixin(
                    ResourceManagementAspectMixin(
                        Context
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

