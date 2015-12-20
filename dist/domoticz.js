var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var bootstrap_1 = require('angular2/bootstrap');
var domoticzService_1 = require("./services/domoticzService/domoticzService");
var http_1 = require("angular2/http");
var http_2 = require("angular2/http");
var router_1 = require("angular2/router");
var homeRoute_1 = require("./routes/home/homeRoute");
var settingsRoute_1 = require("./routes/settings/settingsRoute");
var devicesRoute_1 = require("./routes/devices/devicesRoute");
var Domoticz = (function () {
    function Domoticz() {
        this.offCanvasLeftOpen = false;
        console.log('app loading');
    }
    Domoticz.prototype.toggleoffCanvasLeft = function () {
        this.offCanvasLeftOpen = !this.offCanvasLeftOpen;
    };
    Domoticz = __decorate([
        core_1.Component({
            selector: 'domoticz',
            providers: [domoticzService_1.DomoticzService]
        }),
        core_1.View({
            directives: [router_1.ROUTER_DIRECTIVES],
            template:'<div class=\"off-canvas-wrapper\">\r\n    <div class=\"off-canvas-wrapper-inner\" [ngClass]=\"{\'is-off-canvas-open is-open-left\': offCanvasLeftOpen == true}\">\r\n        <div class=\"off-canvas position-left\" [ngClass]=\"{\'is-open\': offCanvasLeftOpen == true}\" id=\"offCanvas\">\r\n            <h6 class=\"columns\">Menu</h6>\r\n            <ul class=\"menu vertical\">\r\n                <li><a [routerLink]=\"[\'Home\']\" (click)=\"toggleoffCanvasLeft()\">Dashboard</a></li>\r\n                <li><a [routerLink]=\"[\'Devices\']\" (click)=\"toggleoffCanvasLeft()\">Devices</a></li>\r\n                <li><a [routerLink]=\"[\'Settings\']\" (click)=\"toggleoffCanvasLeft()\">Settings</a></li>\r\n            </ul>\r\n        </div>\r\n\r\n        <div class=\"off-canvas-content\">\r\n            <div class=\"top-bar header\">\r\n                <div class=\"top-bar-left\">\r\n                    <button class=\"menu-icon\" type=\"button\" data-open=\"offCanvasLeft\" aria-expanded=\"false\" aria-controls=\"offCanvasLeft\" (click)=\"toggleoffCanvasLeft()\"></button>\r\n                    <span class=\"menu-text\">Domoticz connect</span>\r\n                </div>\r\n                <div class=\"top-bar-right\">\r\n                </div>\r\n            </div>\r\n            <div class=\"page-content\">\r\n                <router-outlet></router-outlet>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>'
        }),
        router_1.RouteConfig([
            { path: '/', name: 'Home', component: homeRoute_1.HomeRoute, useAsDefault: true },
            { path: '/devices', name: 'Devices', component: devicesRoute_1.DevicesRoute },
            { path: '/settings', name: 'Settings', component: settingsRoute_1.SettingsRoute },
        ]), 
        __metadata('design:paramtypes', [])
    ], Domoticz);
    return Domoticz;
})();
bootstrap_1.bootstrap(Domoticz, [
    http_1.HTTP_PROVIDERS,
    http_2.JSONP_PROVIDERS,
    router_1.ROUTER_PROVIDERS,
    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
]);

//# sourceMappingURL=domoticz.js.map
