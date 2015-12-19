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
var domoticzService_1 = require("../../services/domoticzService/domoticzService");
var deviceList_1 = require("../../components/deviceList/deviceList");
var DevicesRoute = (function () {
    function DevicesRoute(domserv) {
        this.plans = [];
        this.devices = [];
        this.domoticzSerivice = domserv;
        this.getDevices();
    }
    DevicesRoute.prototype.getDevices = function () {
        var _this = this;
        this.domoticzSerivice.getAllDevices().subscribe(function (res) {
            _this.devices = res.json().result;
            console.log(res.json().result);
        });
    };
    DevicesRoute.prototype.getPlans = function () {
        this.domoticzSerivice.getAllPlans().subscribe(function (res) {
            this.plans = res.json();
        });
    };
    DevicesRoute.prototype.getDevicesForPlan = function () {
    };
    DevicesRoute = __decorate([
        core_1.Component({
            selector: 'home-route'
        }),
        core_1.View({
            template:'<device-list [list]=\"devices\"></device-list>',
            directives: [deviceList_1.DeviceList]
        }), 
        __metadata('design:paramtypes', [domoticzService_1.DomoticzService])
    ], DevicesRoute);
    return DevicesRoute;
})();
exports.DevicesRoute = DevicesRoute;

//# sourceMappingURL=devicesRoute.js.map
