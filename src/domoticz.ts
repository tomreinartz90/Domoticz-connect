import {Component, View, provide} from 'angular2/core';
import {bootstrap} from 'angular2/bootstrap';
import  {DomoticzService} from "./services/domoticzService/domoticzService"
import {HTTP_PROVIDERS} from "angular2/http";
import {Http, Jsonp, JSONP_PROVIDERS} from "angular2/http";
import {RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, LocationStrategy, HashLocationStrategy} from "angular2/router";
import {HomeRoute} from "./routes/home/homeRoute";
import {SettingsRoute} from "./routes/settings/settingsRoute";
import {DevicesRoute} from "./routes/devices/devicesRoute";

@Component({
    selector: 'domoticz',
    providers: [DomoticzService]
})

@View({
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'domoticz.tpl.html'
})

@RouteConfig([
    {path:'/', name: 'Home', component: HomeRoute, useAsDefault: true },
    {path:'/devices',        name: 'Devices',       component: DevicesRoute},
    {path:'/settings',        name: 'Settings',       component: SettingsRoute},
])

class Domoticz {
    offCanvasLeftOpen:boolean = false;
    constructor() {
        console.log('app loading')
    }

    toggleoffCanvasLeft() {
        this.offCanvasLeftOpen = !this.offCanvasLeftOpen;
    }
}

bootstrap(Domoticz, [
    HTTP_PROVIDERS,
    JSONP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
