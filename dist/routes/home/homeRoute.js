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
var HomeRoute = (function () {
    function HomeRoute(domserv) {
        this.plans = [];
        this.devicesByPlan = [];
        this.devices = [];
        this.activePlan = { meta: null };
        this.domoticzSerivice = domserv;
        this.getPlans();
    }
    HomeRoute.prototype.getDevices = function () {
        var _this = this;
        this.domoticzSerivice.getAllDevices().subscribe(function (res) {
            _this.devices = res.json().result;
        });
    };
    HomeRoute.prototype.getPlans = function () {
        var _this = this;
        //get devices for the default plan
        this.getDevicesForPlan({
            idx: 0,
            Name: 'all'
        });
        this.domoticzSerivice.getAllPlans().subscribe(function (res) {
            if (res.json().status == "OK") {
                _this.plans = res.json().result;
                _this.plans.forEach(function (plan) {
                    _this.getDevicesForPlan(plan);
                });
            }
            else {
                _this.getPlans();
            }
        });
    };
    HomeRoute.prototype.setActivePlan = function (idx) {
        var activePlan = [];
        var _this = this;
        this.devicesByPlan.forEach(function (plan) {
            if (plan.meta.idx == idx)
                _this.activePlan = plan;
        });
        return activePlan;
    };
    HomeRoute.prototype.getDevicesForPlan = function (plan) {
        var _this = this;
        this.domoticzSerivice.getDevicesByPlan(plan.idx).subscribe(function (res) {
            var mergedPlan = {
                meta: {},
                result: {}
            };
            if (res.json().status == "OK") {
                mergedPlan.meta = plan;
                mergedPlan.result = res.json().result;
                _this.devicesByPlan.push(mergedPlan);
                if (_this.activePlan.meta == null)
                    _this.setActivePlan(plan.idx);
            }
        });
    };
    HomeRoute = __decorate([
        core_1.Component({
            selector: 'home-route'
        }),
        core_1.View({
            template:'<div class=\"row\">\r\n    <ul class=\"vertical medium-horizontal menu\">\r\n        <li *ngFor=\"#plan of devicesByPlan\" ><a (click)=\"setActivePlan(plan.meta.idx)\" class=\"button\" [ngClass]=\"{\'disabled\': plan.meta.idx == activePlan.meta.idx}\">{{plan.meta.Name}}</a></li>\r\n    </ul>\r\n</div>\r\n<device-list [list]=\"activePlan.result\"></device-list>',
            directives: [deviceList_1.DeviceList]
        }), 
        __metadata('design:paramtypes', [domoticzService_1.DomoticzService])
    ], HomeRoute);
    return HomeRoute;
})();
exports.HomeRoute = HomeRoute;

//# sourceMappingURL=homeRoute.js.map
